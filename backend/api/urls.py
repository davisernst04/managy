from django.urls import path
from . import views
from users import views as userViews

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("amenity/create/", views.AmenityCreate.as_view(), name="create-amenity"),
    path("amenity/view/", views.AmenityList.as_view(), name="view-amenity"),
    path("amenity/delete/<int:pk>/", views.AmenityDelete.as_view(), name="delete-amenity"),
    path("amenity/update/<int:pk>/", views.AmenityUpdate.as_view(), name="update-amenity"),
    path("amenity/get_amenity/<int:pk>/", views.sortingAmeneties.as_view(), name="amenity-sort"),
    path("amenity/search/<str:name>/", views.searchAmenitiesByName.as_view(), name="amenity-search"),

    path("amenity/booking/create/", views.createBooking.as_view(), name="amenity-book"),
    path("amenity/booking/view/", views.getBooking.as_view(), name="amenity-book-list"),
    path("amenity/booking/cancel/<int:pk>/",views.cancelBooking.as_view(), name="amenity-cancel"),

    path("recreational_venue/create/", views.RecreationalVenueView.as_view(), name="recreational-create"),

    path("event/create/", views.EventCreate.as_view(), name="create-event"),
    path("event/view/", views.EventList.as_view(), name="view-event"),
    path("event/update/<int:pk>/", views.EventUpdate.as_view(), name="update-event"),
    path("event/delete/<int:pk>/", views.EventDelete.as_view(), name="delete-event"),

    path("event/get_event_name/<str:query>/", views.getEventName.as_view(), name="event-search"),
    path("event/get_event/<int:pk>/", views.sortingEvents.as_view(), name="event-sort"),
    path("event/filter_event_date/<str:start>/<str:end>/", views.searchEvents.as_view(), name="event-search"),

    path("event/selection/create/", views.EventSelectionCreate.as_view(), name="event-selection"),
    path("event/selection/view/", views.EventSelectionView.as_view(), name="event-selection-view"),
    path("event/selection/register/<int:pk>/", views.EventSelectionRegister.as_view(), name="event-register"),
    path("event/selection/register/cancel/<int:pk>/", views.EventSelectionCancel.as_view(), name="event-cancel"),

    path("admin/createuser/", userViews.CreateUserView.as_view(), name="create-user"),
    path("admin/deleteuser/<int:pk>/", userViews.UserDeleteView.as_view(), name="user-delete"),
    path("admin/search/", userViews.UserSearchViewMultiple.as_view(), name="user-search"),

    path("image/", views.uploadImageView.as_view(), name="upload-image"),
    path("excel/", views.uploadExcelView.as_view(), name="upload-excel"),

]