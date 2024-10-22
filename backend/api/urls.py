from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("amenity/", views.AmenityCreate.as_view(), name="create-amenity"),
    path("amenity/delete/<int:pk>/", views.AmenityDelete.as_view(), name="delete-amenity")
]