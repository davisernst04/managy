from django.test import TestCase
from api.models import Amenity
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
#import requests

import base64
import requests


# Create your tests here.
class AmenityTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.test_user = get_user_model().objects.create_user(
            username='testuser',
            email='meme@sas.sm',
            password='testpass'
        )

        cls.amenity = Amenity.objects.create(
            name="Cool place",
            description="Nice place to vibe",
            capacity=10,
            occupied=False,
            author=cls.test_user
        )
    def test_amenity_creation(self):
        """Test that the Amenity instance is created correctly."""
        amenity = self.amenity
        self.assertEqual(self.amenity.name, "Cool place")
        self.assertEqual(self.amenity.description, "Nice place")
        self.assertEqual(self.amenity.capacity, 10)
        self.assertEqual(self.amenity.occupied,False)
        print("Amenity Created: name="+self.amenity.name+",description="+self.amenity.description+",capacity:"+str(self.amenity.capacity)+"")
    def test_str_method(self):
        """Test the string representation of the Amenity."""
        self.assertEqual(str(self.amenity), "Cool place")  # Assuming __str__ method returns the name
        print("Testing str:"+str(self.amenity))

    def test_capacity_positive(self):
        """Test that the capacity is a positive integer."""
        self.assertGreater(self.amenity.capacity,0)
        print("Testing capacity:"+str(self.amenity.capacity))

    def test_update_amenity(self):
        """Test updating an Amenity instance."""
        self.amenity.name = "Updated place"
        self.amenity.save()
        updated_amenity = Amenity.objects.get(id=self.amenity.id)
        self.assertEqual(updated_amenity.name, "Updated place")
        print("Amenity updated: name="+self.amenity.name+",description="+self.amenity.description+",capacity:"+str(self.amenity.capacity))

    def test_delete_amenity(self):
        """Test deleting an Amenity instance."""
        amenity_id = self.amenity.id
        self.amenity.delete()
        with self.assertRaises(Amenity.DoesNotExist):
            Amenity.objects.get(id=amenity_id)


class AdminTest(TestCase):

    def setUp(self):
        username = 'admin@admin.com'
        mypassword = 'zdLFekMpNj08'
        response = self.client.post(
            '/api-token/', {'username': username, 'password': mypassword}
        )
        self.assertEqual(response.status_code, 200)
        self.token = response.json()['access']
        credentials = f"{username}:{mypassword}"
        self.basic_token = base64.b64encode(credentials.encode()).decode()
        self.header_basic = {
            'Authorization': f'Basic {self.basic_token}',
            'Content-Type': 'application/json'
        }


    def test_log_in_m(self):
        """
        login
        """
        print("TEST:login_m")
        response = self.client.get(
            '/api/token/',
            {
                "username": "one@one.com",
                "password": "Hola1234$"
            }
        )
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json()['detail'], "No active account found with the given credentials")


    def test_C_recr_ven(self):
        print("test_C_recr_ven")
        response = self.client.post(
            '/api/recreational_venue/create/',
            {
                "name": "Club 1",
                "address": "arrra  57",
                "photo": "adff"
            },
            headers=self.header_basic
        )
        self.assertEqual(response.status_code, 201)
        dict_result = {
            "id": 1,
            "name": "Club 1",
            "address": "arrra  57",
            "photo": "adff"
        }
        self.assertEqual(response.json(), dict_result)

    def test_C_admin(self):
        print("test_C_admin")
        data_in = {
            "first_name": "admin",
            "email": "admin@admin.com",
            "password": "zdLFekMpNj08",
            "recreational_venue_id": 1,
            "dob": "2024-10-28",
            "telephone": "52851",
            "address": "sss"
        }
        response = self.client.post(
            '/users/register/admin/',
            data_in
        )
        self.assertEqual(response.status_code, 201)
        dict_result = {
            "id": 1,
            "first_name": "admin",
            "email": "admin@admin.com",
            "role": "admin",
            "username": "admin@admin.com",
            "recreational_venue": [
                1
            ],
            "dob": "2024-10-28",
            "telephone": "52851",
            "address": "sss"
        }
        self.assertEqual(response.json(), dict_result)

    def test_C_worker(self):
        print("test_C_worker")
        data_in = {
            "first_name": "worker",
            "email": "worker@worker.com",
            "role": "worker",
            "recreational_venue_id": None
        }
        response = self.client.post(
            '/users/admin/createuser/',
            data_in, headers=self.header_basic
        )
        self.assertEqual(response.status_code, 201)
        dict_result = {
            "id": 3,
            "first_name": "worker",
            "email": "workera@worker.com",
            "role": "worker"
        }
        self.assertEqual(response.json(), dict_result)

    def test_C_member(self):
        print("test_C_member")
        data_in = {
            "first_name": "member",
            "email": "member@member.com",
            "role": "member",
            "recreational_venue_id": None
        }
        response = self.client.post(
            '/users/admin/createuser/',
            data_in, headers=self.header_basic
        )
        self.assertEqual(response.status_code, 201)
        dict_result = {
            "id": 3,
            "first_name": "member",
            "email": "member@member.com",
            "role": "member"
        }
        self.assertEqual(response.json(), dict_result)

    def test_D_usr(self):
        print("test_D_usr")
        data_in = {
            "first_name": "member1",
            "email": "member1@member1.com",
            "role": "member",
            "recreational_venue_id": None
        }
        response = self.client.post(
            '/users/admin/createuser/',
            data_in, headers=self.header_basic
        )
        self.assertEqual(response.status_code, 201)

        response = self.client.delete(
            f'/users/admin/deleteuser/{response.json()["id"]}/',
            headers=self.header_basic
        )
        self.assertEqual(response.status_code, 204)
        dict_result = {
            "message": "Member deleted successfully"
        }
        self.assertEqual(response.json(), dict_result)


    def test_C_usr_batch(self):
        print("test_C_usr_batch")
        data_in = {
            "role": "member",
            "excel_link": "https://storage.googleapis.com/download/storage/v1/b/managy_bucket/o/admin_excel%2Ftestbatchcreation.xlsx?generation=1730534493063868&alt=media"
        }
        response = self.client.post(
            '/user/admin/createuserbatch/',
            data_in, headers=self.header_basic
        )
        self.assertEqual(response.status_code, 201)
        dict_result = {
            "message": "Users Successfully Created"
        }
        self.assertEqual(response.json(), dict_result)

        data_in = {
            "email": "one@one.com"
        }
        response = self.client.post(
            '/user/resetpassword/',
            data_in, headers=self.header_basic
        )
        self.assertEqual(response.status_code, 200)
        dict_result = {
            "success": "We have sent you the token to reset your password"
        }
        self.assertEqual(response.json(), dict_result)

        response = self.client.post(
            '/api/admin/search/',
            headers=self.header_basic
        )
        self.assertEqual(response.status_code, 200)
        print(response.json())
        dict_result = [
            {
                "id": 1,
                "first_name": "admin",
                "email": "admin@admin.com",
                "role": "admin",
                "username": "admin@admin.com",
                "recreational_venue": [
                    1
                ]
            },
            {
                "id": 2,
                "first_name": "worker",
                "email": "worker@worker.com",
                "role": "worker",
                "username": "worker@worker.com",
                "recreational_venue": [
                    1
                ]
            },
            {
                "id": 4,
                "first_name": "one",
                "email": "one@one.com",
                "role": "member",
                "username": "one@one.com",
                "recreational_venue": [
                    1
                ]
            },
            {
                "id": 5,
                "first_name": "two",
                "email": "two@one.com",
                "role": "member",
                "username": "two@one.com",
                "recreational_venue": [
                    1
                ]
            },
            {
                "id": 6,
                "first_name": "three",
                "email": "three@one.com",
                "role": "member",
                "username": "three@one.com",
                "recreational_venue": [
                    1
                ]
            },
            {
                "id": 7,
                "first_name": "four",
                "email": "four@one.com",
                "role": "member",
                "username": "four@one.com",
                "recreational_venue": [
                    1
                ]
            },
            {
                "id": 8,
                "first_name": "five",
                "email": "five@one.com",
                "role": "member",
                "username": "five@one.com",
                "recreational_venue": [
                    1
                ]
            }
        ]
        self.assertEqual(response.json(), dict_result)


    def tearDown(self):
        pass

    @classmethod
    def tearDownClass(cls):
        pass

class MemberTest():
    #One for CRUD users
    #One for CRUD events/amenities
    pass

class WorkerTest():
    pass