import uuid
from users.models import Person
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title

class Amenity(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    capacity = models.IntegerField(validators=[MinValueValidator(0)])
    occupied = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="amenity")
    image = models.TextField()

    def __str__(self):
        return self.name

    def isOccupied(self):
        return self.occupied

    def getCapacity(self):
        return self.capacity
class Events(models.Model):
    eventName = models.CharField(max_length=50)
    eventDescription = models.TextField()
    eventLocation = models.TextField()
    eventTime = models.TimeField()
    eventDate = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="event")

    def __str__(self):
        return self.name
    def getEventDetails(self):
        return  f"{self.eventName} {self.eventDescription} {self.eventLocation} {self.eventTime}"