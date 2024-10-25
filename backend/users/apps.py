from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'

    #def ready(self):
    #    member_user, created = Group.objects.get_or_create(name=' ')