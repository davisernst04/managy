from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("amenity/create/", views.AmenityCreate.as_view(), name="create-amenity"),
    path("amenity/view/", views.AmenityList.as_view(), name="view-amenity"),
    path("amenity/delete/<int:pk>/", views.AmenityDelete.as_view(), name="delete-amenity"),
    path("amenity/get_amenity/<int:pk>/", views.sortingAmeneties.as_view(), name="amenity-sort"),
    path("amenity/booking/", views.createBooking.as_view(), name="amenity-book"),
    path("amenity/booking/view", views.getBooking.as_view(), name="amenity-book-list"),
    path("amenity/booking/cancel/<int:pk>/",views.cancelBooking.as_view(), name="amenity-cancel"),
    path("event/create/", views.EventCreate.as_view(), name="create-event"),
    path("event/view/", views.EventList.as_view(), name="view-event"),
    path("event/delete/<int:pk>/", views.EventDelete.as_view(), name="delete-event"),
    path("event/get_event_name/<str:query>/", views.getEventName.as_view(), name="event-search"),
    path("event/get_event/<int:pk>/", views.sortingEvents.as_view(), name="event-sort"),

]