
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import PersonSerializer, WorkerSerializer, MemberSerializer, AdminSerializer
from .serializers import UserFromAdminSerl, UserFromAdminBatchSerl
from .serializers import ResetPasswordRequestSerializer, ResetPasswordSerializer
from .models import Person, Worker, Member, Admin
from .models import PasswordReset
from .permissions import IsMember, IsAdmin, IsWorker
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import generics, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from api.models import RecreationalVenue

from .requests import send_post_request_createBatch
from data.email_helpers import send_token_password

import pandas as pd


class UserListView(generics.ListAPIView):
    authentication_classes = [JWTAuthentication,
                              SessionAuthentication,
                              BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def get_queryset(self):
        return Person.objects.all()


'''Searches by id'''


class UserSearchView(generics.ListAPIView):
    authentication_classes = [JWTAuthentication,
                              SessionAuthentication,
                              BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def get_queryset(self):
        order = self.kwargs.get('pk', '')
        return Person.objects.all()


'''Searches multiple parameters'''


class UserSearchViewMultiple(generics.ListAPIView):
    authentication_classes = [JWTAuthentication,
                              SessionAuthentication,
                              BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def get_queryset(self):
        # Users set
        user_ids = set()

        name = self.request.query_params.get('name', None)
        email = self.request.query_params.get('email', None)
        id = self.request.query_params.get('id', None)
        role = self.request.query_params.get('role', None)

        admin_id = self.request.user.id
        admin = Admin.objects.get(id=admin_id)

        for recr_venue in admin.recreational_venue.all():
            # Add Ids
            user_ids.update(recr_venue.persons.values_list('id', flat=True))

        # Filtrar y devolver un queryset de usuarios únicos
        query_set = Person.objects.filter(id__in=user_ids).distinct()

        filters = {}
        if name:
            filters['first_name__icontains'] = name  # Case-insensitive match
        if email:
            filters['email'] = email
        if id:
            filters['id'] = id
        if role:
            filters['role'] = role

        return query_set.filter(**filters)


class UserDeleteView(generics.DestroyAPIView):
    authentication_classes = [JWTAuthentication,
                              SessionAuthentication,
                              BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def perform_destroy(self, instance):
        instance.delete()

    def get_queryset(self):
        return Person.objects.all()


class CreateUserView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication,
                              SessionAuthentication,
                              BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def perform_create(self, serializer):
        role = self.request.data.get('role')
        email = self.request.data.get('email')
        name = self.request.data.get('first_name')

        temp_username = f"temp_user_{email.split('@')[0]}"
        #user = serializer.save(username=temp_username,role=role,email=email)
        Admin.create_person(self, username=temp_username, name=name, role=role, email=email)


class CreateUserWorkerView(generics.CreateAPIView):
    serializer_class = WorkerSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        worker = serializer.save()
        return worker


class CreateUserMemberView(generics.CreateAPIView):
    serializer_class = MemberSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        member = serializer.save()
        return member


class CreateUserAdminView(generics.CreateAPIView):
    serializer_class = AdminSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Person.objects.all()

    def perform_create(self, serializer):
        recreational_id = self.request.data.get('recreational_venue_id')
        if not recreational_id:
            raise ValidationError("Recreational venue ID must be provided.")
        try:
            recreational_venue = RecreationalVenue.objects.get(id=recreational_id)
            admin = serializer.save()
            admin.recreational_venue.add(recreational_venue)
        except RecreationalVenue.DoesNotExist:
            raise ValidationError("Recreational venue doesn't exist")
        return admin


class UserFromAdminView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication,
                              SessionAuthentication,
                              BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = UserFromAdminSerl

    def perform_create(self, serializer):
        admin_id = self.request.user.id
        serializer.save(admin_id=admin_id)


class DelUserFromAdminView(generics.DestroyAPIView):
    queryset = Person.objects.all()
    authentication_classes = [JWTAuthentication,
                              SessionAuthentication,
                              BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = UserFromAdminSerl

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()  # Get the object to delete
            self.perform_destroy(instance)  # Call the method to delete the instance
            return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": "User not found + " + str(e)}, status=status.HTTP_404_NOT_FOUND)

    def perform_destroy(self, instance):
        instance.delete()


class UserFromAdminBatchView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication,
                              SessionAuthentication,
                              BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = UserFromAdminBatchSerl

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        role = validated_data.pop("role")
        excel_file = validated_data.pop('excel_link')
        ''''excel_file = ("https://storage.googleapis.com/download/storage/"
                      "v1/b/managy_bucket/o/admin_excel%2Ftestbatchcreation.xlsx?"
                      "generation=1730534493063868&alt=media")'''

        file_path = excel_file
        # df = pd.read_excel(file_path)
        df = pd.read_excel(file_path, engine='openpyxl')
        done_isd = []

        try:
            for index, row in df.iterrows():
                name = row['name']
                email = row['email']

                data = {
                    "first_name": name,
                    "email": email,
                    "role": role,
                    "recreational_venue_id": None
                }
                done_isd.append(send_post_request_createBatch(data))

        except Exception as e:
            for idi in done_isd:
                instance = Person.objects.get(pk=idi)
                instance.delete()
            raise AttributeError({"message": "Due to error: " + str(e) + "\nUsers "
                                                                         "created were rolled back: " + str(
                done_isd)})

        return Response({"message": "Users Successfully Created"}, status=status.HTTP_201_CREATED)

    '''def perform_create(self, serializer):
        serializer.save()
        return {"message": "Users Successfully Created"}'''


class RequestPasswordReset(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ResetPasswordRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        email = request.data['email']
        person = Person.objects.filter(email__iexact=email).first()

        if person:
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(person)
            reset = PasswordReset(email=email, token=token)
            reset.save()

            send_token_password(email, token)

            #reset_url = f"{os.environ['PASSWORD_RESET_BASE_URL']}/{token}"
            # Sending reset link via email (commented out for clarity)
            # ... (email sending code)

            return Response({'success': 'We have sent you the token to reset your password'}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User with credentials not found"}, status=status.HTTP_404_NOT_FOUND)


class ResetPassword(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = []

    def post(self, request, token):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        new_password = data['new_password']
        confirm_password = data['confirm_password']

        if new_password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=400)

        reset_obj = PasswordReset.objects.filter(token=token).first()

        if not reset_obj:
            return Response({'error': 'Invalid token'}, status=400)

        person = Person.objects.filter(email=reset_obj.email).first()

        if person:
            person.set_password(request.data['new_password'])
            person.save()

            reset_obj.delete()

            return Response({'success': 'Password updated'})
        else:
            return Response({'error': 'No user found'}, status=404)
