from .serializers import (PersonSerializer, WorkerSerializer,
                         MemberSerializer, CreateAdminSerializer,
                         RecreationalVenueSerializer, AdminSerializer)
from .models import Person, Worker, Member, Admin, RecreationalVenue
from .permissions import IsMember, IsAdmin, IsWorker
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import generics

from rest_framework.response import Response
from rest_framework import status

class RecreationalVenueView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RecreationalVenueSerializer

    def post(self, request, *args, **kwargs):
        serializer = RecreationalVenueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserListView(generics.ListAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def get_queryset(self):
        return Person.objects.all()

class UserDeleteView(generics.DestroyAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def perform_destroy(self,instance):
        instance.delete()

class CreateUserWorkerView(generics.CreateAPIView):
    serializer_class = WorkerSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
            worker = serializer.save() #This will use the create method from the serializer
            return worker

class CreateUserMemberView(generics.CreateAPIView):
    serializer_class = MemberSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        member = serializer.save()  #This will use the create method from the serializer
        return member

class CreateUserAdminView(generics.CreateAPIView):
    serializer_class = CreateAdminSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        print(request.data)
        input_params = request.data
        input_params = dict(input_params)

        try:
            myvenue = RecreationalVenue.objects.get(id=int(input_params['recreational_venue_id'][0]))  # Cambia el ID al que necesitas
        except RecreationalVenue.DoesNotExist:
            return Response({"message":{"Model does not exists"}},
                            status=status.HTTP_400_BAD_REQUEST)


        del input_params['recreational_venue_id']
        input_params['recreational_venue'] = myvenue

        serializer = AdminSerializer(data=input_params)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    #def perform_create(self, serializer):
        #admin = serializer.save() #This will use the create method from the serializer
        #return admin