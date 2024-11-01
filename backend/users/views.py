from .serializers import PersonSerializer, WorkerSerializer, MemberSerializer, AdminSerializer
from .models import Person, Worker, Member, Admin
from .permissions import IsMember, IsAdmin, IsWorker
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import generics
from rest_framework.exceptions import ValidationError


class UserListView(generics.ListAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def get_queryset(self):
        return Person.objects.all()


'''Searches by id'''
class UserSearchView(generics.ListAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def get_queryset(self):
        order=self.kwargs.get('pk','')
        return Person.objects.all()


'''Searches multiple parameters'''
class UserSearchViewMultiple(generics.ListAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def get_queryset(self):
        name=self.kwargs.get('name','')
        id=self.kwargs.get('id','')
        role=self.kwargs.get('role', '')
        email=self.kwargs.get('email','')

        Search=Admin.find_person(id=id,name=name,role=role,email=email)

        return Search


class UserDeleteView(generics.DestroyAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def perform_destroy(self,instance):
        instance.delete()

    def get_queryset(self):
        return Person.objects.all()

class CreateUserView(generics.CreateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def perform_create(self,serializer):
        role = self.request.data.get('role')
        email = self.request.data.get('email')
        name = self.request.data.get('first_name')

        temp_username=f"temp_user_{email.split('@')[0]}"
        #user = serializer.save(username=temp_username,role=role,email=email)
        Admin.create_person(self,username=temp_username,name=name,role=role,email=email)

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
        from api.models import RecreationalVenue
        recreational_id = self.request.data.get('recreational_venue_id')
        if not recreational_id:
            raise ValidationError("Recreational venue ID must be provided.")
        try:
            recreational_venue=RecreationalVenue.objects.get(id=recreational_id)
            admin = serializer.save()
            admin.recreational_venue.add(recreational_venue)
        except RecreationalVenue.DoesNotExist:
            raise ValidationError("Recreational venue doesn't exist")
        return admin