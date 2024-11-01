from django.urls import path
from . import views

urlpatterns = [
    path("recreational_venue/create/", views.RecreationalVenueView.as_view(), name="create-rect-venue"),
]