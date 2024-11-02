from rest_framework import serializers

from .models import Person, Worker, Member, Admin

from .utils import RandomString

from api.models import RecreationalVenue

from rest_framework.exceptions import ValidationError

class PersonViewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Person
        fields = ["id", "first_name", "email",
                  "role", "username",
                  'recreational_venue']

        extra_kwargs = {
            "id": {"read_only": True},
            "recreational_venue": {
                "read_only": True
            },
            "username": {"read_only": True}
        }


class PersonSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, style={'input_type': 'password'},
        default=RandomString(20))
    recreational_venue_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Person
        fields = ["id", "first_name", "email",
                  "role", "password", "username",
                  'recreational_venue', 'recreational_venue_id'
                  ]

        extra_kwargs = {
            "id": {"read_only": True},
            "password": {
                "write_only": True,
                "default": RandomString(20)
            },
            "recreational_venue": {
                "read_only": True
            },
            "username": {"read_only": True}
        }

    def create(self, validated_data):
        recreational_venue_id = validated_data.pop('recreational_venue_id')
        validated_data["username"] = validated_data["email"]
        user = Person(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

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
    password = serializers.CharField(
        write_only=True, style={'input_type': 'password'})
    recreational_venue_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Admin

        fields = (PersonSerializer.Meta.fields +
                  ["dob", "telephone", 'address'])

        extra_kwargs = PersonSerializer.Meta.extra_kwargs
        extra_kwargs["role"] = {"read_only": True}

    def create(self, validated_data):
        recreational_venue_id = validated_data.pop('recreational_venue_id')
        admin = Admin.create_admin(**validated_data)

        return admin


class UserFromAdminSerl(serializers.ModelSerializer):
    recreational_venue_id = serializers.IntegerField(write_only=True,
            allow_null=True)

    class Meta:
        model = Person

        fields = ["id", "first_name", "email",
                  "role", "recreational_venue_id"]

        extra_kwargs = {
            "id": {"read_only": True},
        }

    def create(self, validated_data):
        "admin_id in function parameters"

        if validated_data.get("role") == "admin":
            raise ValidationError({"message": "Admin role is not accepted in this serializer"})

        if validated_data.get("recreational_venue_id") is None:
            admin = Admin.objects.get(id = validated_data.get("admin_id"))
            recreational_venue = admin.recreational_venue.first()
        else:
            recreational_venue = (
                RecreationalVenue.objects.get(id = validated_data.get("recreational_venue_id")))

        validated_data.pop('recreational_venue_id')
        validated_data.pop('admin_id')

        user = Admin.create_person(**validated_data)

        user.recreational_venue.add(recreational_venue)

        return user


class UserFromAdminBatchSerl(serializers.ModelSerializer):
    excel_link = serializers.CharField(write_only=True)

    class Meta:
        model = Person
        fields = ["role", "excel_link"]

    '''def create(self, validated_data):

        role = validated_data.pop("role")
        excel_file = validated_data.pop('excel_link')

        file_path = excel_file
        #df = pd.read_excel(file_path)
        df = pd.read_excel(file_path, engine='openpyxl')
        done_isd = []

        try:
            for index, row in df.iterrows():
                name = row['name']
                email = row['email']

                data = {
                    "first_name": name,
                    "email": email,
                    "role": role,
                    "recreational_venue_id": None
                }
                done_isd.append(send_post_request_createBatch(data))

        except Exception as e:
            for idi in done_isd:
                instance = Person.objects.get(pk=idi)
                instance.delete()
            raise AttributeError({"message": "Due to error: "+str(e)+"\nUsers "
                                    "created were rolled back: "+str(done_isd)})

        return {"message": "Users Successfully Created"}'''


class ResetPasswordRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.RegexField(
        regex=r'^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
        write_only=True,
        error_messages={
            'invalid': ('Password must be at least 8 characters long with at least one capital letter and symbol')
        }
    )
    confirm_password = serializers.CharField(write_only=True, required=True)