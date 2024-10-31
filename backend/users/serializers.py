from rest_framework import serializers
from .models import Person, Worker, Member, Admin
from api.serializers import RecreationalVenueSerializer


class PersonSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    recreational_venues = RecreationalVenueSerializer(many=True)

    class Meta:
        model = Person
        fields = ["username", "password", "first_name",
                  "last_name", "email", "dob", "telephone",
                  "recreational_venues"]
        # No one can read the password
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Person(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


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


class AdminSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = Admin
        fields = PersonSerializer.Meta.fields

    #Create admin using the creator method in the model
    def create(self, validated_data):
        admin = Admin.create_admin(**validated_data)
        return admin
