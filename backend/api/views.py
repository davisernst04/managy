#from django.shortcuts import render
#from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, AmenitySerializer, EventSerializer, BookingAmenitySerializer, BookingAmenitySerializerView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Amenity, Events, BookingAmenity
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from users.permissions import IsWorker, IsMember, IsAdmin
from django.views.generic.edit import DeleteView

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

class AmenityCreate(generics.CreateAPIView):
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

class AmenityList(generics.ListAPIView):
    serializer_class = AmenitySerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        #user = self.request.user
        return Amenity.objects.all()
        #return Amenity.objects.filter(author=user)


class AmenityDelete(generics.DestroyAPIView):
    serializer_class = AmenitySerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsWorker]
    queryset = Amenity.objects.all()

    def perform_destroy(self, instance):
        # You can add any additional logic here before deletion
        instance.delete()

# Events
class EventCreate(generics.CreateAPIView):
    serializer_class = EventSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsWorker]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class EventList(generics.ListAPIView):
    serializer_class = EventSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Events.objects.all()

class EventDelete(generics.DestroyAPIView):
    serializer_class = EventSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsWorker]

    #Event Delete
    def perform_destroy(self, instance):
        instance.delete()

class getEventName(generics.ListAPIView):
    serializer_class = EventSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query=self.kwargs.get('query','')
        return Events.objects.filter(eventName__icontains=query)

class sortingEvents(generics.ListAPIView):
    serializer_class = EventSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        order=self.kwargs.get('pk','')
        if order==0:
            result=Events.objects.all()
        elif order==1:
            result=Events.objects.all().order_by('eventDate').values()
        elif order==2:
            result=Events.objects.all().order_by('-eventDate').values()
        else:
            result = Events.objects.all()

        return result



class sortingAmeneties(generics.ListAPIView):
    serializer_class = AmenitySerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        order=self.kwargs.get('pk','')
        if order==0:
            result=Amenity.objects.all()
        elif order==1:
            result=Amenity.objects.all().order_by('name').values()
        elif order==2:
            result=Amenity.objects.all().order_by('-name').values()
        else:
            result = Amenity.objects.all()
        return result


class createBooking(generics.CreateAPIView):
    serializer_class = BookingAmenitySerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsMember]

    def perform_create(self, serializer):
        print("Test")
        book = serializer.save(author=self.request.user)
        return book

class getBooking(generics.ListAPIView):
    serializer_class = BookingAmenitySerializerView
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsMember]

    def get_queryset(self):
        user = self.request.user
        return BookingAmenity.objects.filter(author=user)


class cancelBooking(generics.RetrieveDestroyAPIView):
    serializer_class = BookingAmenitySerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsMember]

    def get_queryset(self):
        user = self.request.user
        return BookingAmenity.objects.filter(author=user)

    def perform_destroy(self, instance):
        # You can add any additional logic here before deletion
        instance.amenities.release()
        instance.delete()
