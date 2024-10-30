from django.test import TestCase
from api.models import Amenity
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
#import requests

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


class MemberTest():
    #One for CRUD users
    #One for CRUD events/amenities

class WorkerTest():
class AdminTest():