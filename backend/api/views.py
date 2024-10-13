from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
#------- Not there (next one)-----------
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

