import React, { useState } from 'react';
import AmenityCard from '../components/ui/AmenityCard';
import AmenityForm from '../components/ui/AmenityForm';

const AmenitiesPage = () => {
    const [amenities, setAmenities] = useState([]);

    const handleAddAmenity = (newAmenity) => {
        setAmenities([...amenities, newAmenity]);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Amenities</h1>
            <AmenityForm onSubmit={handleAddAmenity} />

            <div className="flex flex-wrap mt-6">
                {amenities.map((amenity, index) => (
                    <AmenityCard key={index} amenity={amenity} />
                ))}
            </div>
        </div>
    );
};

export default AmenitiesPage;
