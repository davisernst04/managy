from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, AmenitySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Amenity
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from users.permissions import IsWorker,IsMember,IsAdmin

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

#generics.DestroyAPIView
class AmenityCreate(generics.ListCreateAPIView):
    serializer_class = AmenitySerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsWorker]

    def get_queryset(self):
        user = self.request.user
        return Amenity.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

    #def perform_destroy(self, instance):
    #    # You can add any additional logic here before deletion
    #    instance.delete()

class AmenityList(generics.ListAPIView):
    serializer_class = AmenitySerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Amenity.objects.all()
        #return Amenity.objects.filter(author=user)


class AmenityDelete(generics.DestroyAPIView):
    serializer_class = AmenitySerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsWorker]

    def get_queryset(self):
        user = self.request.user
        return Amenity.objects.filter(author=user)

    def perform_destroy(self, instance):
        # You can add any additional logic here before deletion
        instance.delete()
