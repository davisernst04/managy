from rest_framework import serializers
from .models import Person, Worker, Member, Admin

class PersonSerializer(serializers.ModelSerializer):
    #password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    class Meta:
        model = Person
        #fields = ["username", "password", "first_name", "last_name", "email", "dob", "telephone"]
        fields = ["first_name", "email", "role"]+["username", "password", "first_name", "last_name", "email", "dob", "telephone","id"]
        extra_kwargs = {
            'username': {'read_only': True},
            'last_name': {'read_only': True},
            'password': {'read_only': True},
            'last_name': {'read_only': True},
            'dob': {'read_only': True},
            'telephone': {'read_only': True},
        }

        # No one can read the password
        #extra_kwargs = {"password": {"write_only": True}}

    #def create(self, validated_data):
    #    user = Person(**validated_data)
    #    user.set_password(validated_data['password'])
    #    user.save()
    #    return user

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
        fields = []

    #Create member using the creator method in the model
    def create(self, validated_data):
            member = Member.create_member(**validated_data)
            return member

class AdminSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    recreational_venue_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = Admin
        #fields = ["username", "password", "first_name", "last_name", "email", "dob", "telephone"]

        fields = ["username", "password", "first_name", "last_name", "email", "dob", "telephone"] + ['address', 'recreational_venue','recreational_venue_id']
        extra_kwargs = {"recreational_venue": {"read_only": True}}

    def create(self, validated_data):
        recreational_venue_id = validated_data.pop('recreational_venue_id')
        admin = Admin.create_admin(**validated_data)
        return admin