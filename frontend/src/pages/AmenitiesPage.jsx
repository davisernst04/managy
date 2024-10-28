import React, { useState, useEffect } from 'react';
import AmenityCard from '../components/ui/AmenityCard';
import AmenityForm from '../components/ui/AmenityForm';
import { fetchAmenities, createAmenity, deleteAmenity } from "../api";


const AmenitiesPage = () => {
    const [amenities, setAmenities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAmenities();
    }, []);

    const loadAmenities = async () => {
        try {
            const data = await fetchAmenities();
            setAmenities(data);
        } catch (error) {
            setError("Failed to load amenity. Please try again later.");
        }
    };

    const handleFormSubmit = async (data) => {
        if (!data.name.trim()) {
            setError("Name is required.");
            return;
        }
        if (amenities.some((amenity) => amenity.name === data.name)) {
            setError("An amenity with this name already exists.");
            return;
        }

        try {
            await createAmenity(data);
            loadAmenities();
            setError(null);
        } catch (error) {
            setError("Failed to create amenity. Please try again later.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAmenity(id);
            loadAmenities();
        } catch (error) {
            setError("Failed to delete amenity. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Amenities</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <AmenityForm onSubmit={handleFormSubmit}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {amenities.map((amenity) => (
                    <AmenityCard key={amenity.id} amenity={amenity} onDelete={() => handleDelete(amenity.id)}/>
                ))}
            </div>
        </div>
    );
};

export default AmenitiesPage;



