from .serializers import PersonSerializer, WorkerSerializer
from .serializers import MemberSerializer, AdminSerializer
from .serializers import RecreationalVenueSerializer
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

class UserSearchView(generics.ListAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = PersonSerializer

    def get_queryset(self):
        order=self.kwargs.get('pk','')
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

    def perform_create(self, serializer):
        recreational_id = self.request.data.get('recreational_venue_id')
        recreational_venue = RecreationalVenue.objects.get(id=recreational_id)
        admin = serializer.save()
        admin.recreational_venue.add(recreational_venue)
        return admin