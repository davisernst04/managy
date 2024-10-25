from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("amenity/create/", views.AmenityCreate.as_view(), name="create-amenity"),
    path("amenity/view/", views.AmenityList.as_view(), name="view-amenity"),
    path("amenity/delete/<int:pk>/", views.AmenityDelete.as_view(), name="delete-amenity"),

    #path("worker/",userView.WorkerDetailView.as_view(),name="worker"),
    #path("worker/amenityList", userView.WorkerAmenityListView.as_view(), name="worker-amenity"),
    #path("worker/usersList", userView.WorkerUserListView.as_view(), name="worker-users")

]