import uuid
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import AbstractUser, Group, Permission

class PersonManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, password, **extra_fields)

class Person(AbstractUser):
    ROLES=[
        ('member','Member'),
        ('worker','Worker'),
        ('admin','Admin')
    ]
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLES, default='member')
    dob = models.DateField(null=True)
    telephone = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)
    objects = PersonManager()

    def getInfo(self):
        return [str(self.user.id), str(self.name), str(self.last_name), str(self.email), str(self.dob), str(self.telephone), str(self.role)]

    def getId(self):
        return self.user.id

    #def updateInfo(self):

class Member(Person):
    events = models.CharField(max_length=50)
    @classmethod
    def create_member(cls, email, password=None, **extra_fields):
        extra_fields.setdefault('role', 'member')
        return cls.objects.create_user(email, password, **extra_fields)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"

class Worker(Person):
    address = models.TextField()
    @classmethod
    def create_worker(cls, email, password=None, **extra_fields):
        extra_fields.setdefault('role', 'worker')
        return cls.objects.create_user(email, password, **extra_fields)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"

class Admin(Person):
    address = models.TextField()
    @classmethod
    def create_admin(cls, email, password=None, **extra_fields):
        extra_fields.setdefault('role', 'admin')
        return cls.objects.create_superuser(email, password, **extra_fields)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"
