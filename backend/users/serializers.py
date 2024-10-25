from rest_framework import serializers
from .models import Person, Worker, Member, Admin

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ["username", "password", "first_name", "last_name", "email", "role", "dob", "telephone"]
        # No one can read the password
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Person(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = PersonSerializer.Meta.fields + ['address']

    #Create worker using the creator method in the model
    def create(self, validated_data):
            worker = Worker.create_worker(**validated_data)
            return worker
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = PersonSerializer.Meta.fields + ['events']

    #Create member using the creator method in the model
    def create(self, validated_data):
            member = Member.create_member(**validated_data)
            return member

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = PersonSerializer.Meta.fields

    #Create admin using the creator method in the model
    def create(self, validated_data):
        admin = Admin.create_admin(**validated_data)
        return admin
