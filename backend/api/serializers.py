from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Amenity, Events, BookingAmenity
from django.core.validators import MinValueValidator


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        # No one can read the password
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}


class AmenitySerializer(serializers.ModelSerializer):
    #name = serializers.CharField(max_length=50)
    #description = serializers.CharField()
    #capacity = serializers.IntegerField(default=1, validators=[MinValueValidator(1)])
    occupied = serializers.BooleanField(default=False, read_only=True)
    member_user = serializers.CharField(read_only=True)

    #image = serializers.CharField()
    class Meta:
        model = Amenity
        fields = ["id", "name", "description", "capacity", "occupied", "image", "member_user", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True},
                        "member_user": {"read_only": True}}

    def update(self, instance, validated_data):
        member_user = validated_data.get('member_user', instance.member_user)

        if 'member_user' in validated_data:
            if instance.canRegister():
                instance.member_user = str(member_user)
                instance.occupied = True
                print("Success:")
            else:
                print("Can't register")
        instance.save()
        return instance


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = ["id", "eventName", "eventDescription", "eventLocation", "eventTime", "eventDate", "created_at",
                  "author"]
        extra_kwargs = {"author": {"read_only": True}}


class BookingAmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingAmenity
        fields = ['amenities', 'duration_booked', 'author', 'id']
        extra_kwargs = {"author": {"read_only": True}}

    def validate_amenities(self, value):
        if value.isOccupied():
            raise serializers.ValidationError("This amenity is already occupied.")
        return value

    def create(self, validated_data):
        amenity = validated_data.pop('amenities', None)
        #print("test")
        #print(f"Amenity ID received: {amenity_id}")
        #amenity = Amenity.objects.get(id=amenity_id)
        #print(amenity.getName())
        booking_amenity = BookingAmenity(
            amenities=amenity,
            amenity_name=amenity.getName(),
            duration_booked=validated_data['duration_booked'],
            amenity_details=amenity.getDescription(),  # Fetching details from Amenity
            amenity_capacity=amenity.getCapacity(),  # Fetching capacity from Amenity
            amenity_id=amenity.id,
            author=validated_data['author']  # Associate with the current user
        )
        booking_amenity.save()
        amenity_serial = AmenitySerializer()
        #amenity_serial.update(amenity, {'member_user': validated_data['author']})
        amenity_serial.update(amenity, {'member_user': str(booking_amenity.author)})
        #amenity.register(validated_data['author'])
        return booking_amenity


class BookingAmenitySerializerView(serializers.ModelSerializer):
    class Meta:
        model = BookingAmenity
        fields = ['amenity_name', 'duration_booked', 'amenity_details', 'amenity_capacity', 'amenity_id', 'id']
