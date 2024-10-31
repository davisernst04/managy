#from django.shortcuts import render
#from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, AmenitySerializer, EventSerializer, BookingAmenitySerializer, BookingAmenitySerializerView, EventSelectionSerializer, EventSelectionSerializerView, EventSelectionSerializerUpdate
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Amenity, Events, BookingAmenity, EventSelection
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

class AmenityUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = AmenitySerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsWorker]

    def get_queryset(self):
        user = self.request.user
        return Amenity.objects.filter(author=user)

    def perform_update(self, serializer):
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


class AmenityDelete(generics.RetrieveDestroyAPIView):
    serializer_class = AmenitySerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsWorker]
    queryset = Amenity.objects.all()

    def get_queryset(self):
        return Amenity.objects.all()
    def perform_destroy(self, instance):
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

class EventDelete(generics.RetrieveDestroyAPIView):
    serializer_class = EventSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsWorker]

    def get_queryset(self):
        return Events.objects.all()

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

class searchEvents(generics.ListAPIView):
    serializer_class = EventSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        start=self.kwargs.get('start','')
        end=self.kwargs.get('end','')
        return Events.objects.filter(eventDate__range=[start,end])

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

    def get_serializer_context(self):
        context=super().get_serializer_context()
        context['action'] = 'register'
        return context

    def perform_create(self, serializer):
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

    def get_serializer_context(self):
        context=super().get_serializer_context()
        context['action'] = 'cancel'
        return context
    def get_queryset(self):
        user = self.request.user
        return BookingAmenity.objects.filter(author=user)

    def perform_destroy(self, instance):
        #instance.amenities.release()
        self.get_serializer().delete(instance)

class EventSelectionCreate(generics.CreateAPIView):
    serializer_class = EventSelectionSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsWorker]

    def perform_create(self, serializer):
        eventSelect = serializer.save(author=self.request.user)
        return eventSelect

class EventSelectionView(generics.ListAPIView):
    serializer_class = EventSelectionSerializerView
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        #if(user.role=='member'):
        #    return EventSelection.objects.filter(author=user)
        #elif(user.role=='worker'):
        #    return EventSelection.objects.all()
        #else:
        #    return EventSelection.objects.none()
        return EventSelection.objects.all()

class EventSelectionRegister(generics.RetrieveUpdateAPIView):
    serializer_class = EventSelectionSerializerUpdate
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsMember]

    def get_serializer_context(self):
        context=super().get_serializer_context()
        context['action'] = 'register'
        return context

    def get_queryset(self):
        return EventSelection.objects.all()

    def perform_update(self, serializer):
        eventSelect = serializer.save(member=self.request.user)
        return eventSelect

class EventSelectionCancel(generics.RetrieveUpdateAPIView):
    serializer_class = EventSelectionSerializerUpdate
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsMember]

    def get_serializer_context(self):
        context=super().get_serializer_context()
        context['action'] = 'cancel'
        return context

    def get_queryset(self):
        return EventSelection.objects.all()

    def perform_update(self, serializer):
        eventSelect = serializer.save(member=self.request.user)
        return eventSelect