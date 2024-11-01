from rest_framework import serializers
from .models import Person, Worker, Member, Admin, RecreationalVenue


class RecreationalVenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecreationalVenue
        fields = '__all__'


class PersonSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = Person
        fields = ["username", "password", "first_name",
                  "last_name", "email", "role", "recreational_venue"]
        # No one can read the password
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Person(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class CreatePersonSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = Person
        fields = ["username", "password", "first_name",
                  "last_name", "email", "role"]
        # No one can read the password
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Person(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class CreateAdminSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    recreational_venue_id = serializers.IntegerField()

    class Meta:
        model = Admin
        fields = CreatePersonSerializer.Meta.fields + ["dob",
                "telephone", "recreational_venue_id"]

    #Create admin using the creator method in the model
    def create(self, validated_data):
        admin = Admin.create_admin(**validated_data)
        return admin


class AdminSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = Admin
        fields = PersonSerializer.Meta.fields + ["dob",
                "telephone"]

    #Create admin using the creator method in the model
    def create(self, validated_data):
        admin = Admin.create_admin(**validated_data)
        return admin


class WorkerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = Worker
        fields = PersonSerializer.Meta.fields + ['address']

    #Create worker using the creator method in the model
    def create(self, validated_data):
        worker = Worker.create_worker(**validated_data)
        return worker


class MemberSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = Member
        fields = PersonSerializer.Meta.fields

    #Create member using the creator method in the model
    def create(self, validated_data):
        member = Member.create_member(**validated_data)
        return member
