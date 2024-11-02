'use client';

import { useEffect, useState } from 'react';
import api from "../../api";
import "./createAmenity.css";

function AmenitiesList() {
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAmenities = async () => {
            try {
                const response = await api.get("/api/amenity/view");
                setAmenities(response.data);
            } catch (error) {
                setError("Failed to load amenities. Please try again later.");
            }
        };

        fetchAmenities();
    }, []);

    if (loading) return <p>Loading amenities...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="amenities-list-container">
            <h2>Available Amenities</h2>
            {amenities.map((amenity) => (
                <div key={amenity.id} className="amenity-card">
                    <h3>{amenity.name}</h3>
                    <p>{amenity.description}</p>
                    <p>Room Number: {amenity.roomNumber}</p>
                    <img src={amenity.image} alt={amenity.name} className="amenity-image" />
                    <p>{amenity.rules}</p>
                </div>
            ))}
        </div>
    );
}

export default AmenitiesList;