'use client';

import { useEffect, useState } from 'react';
import api from "@/api";
import "@/styles/createAmenity.css";

function AmenitiesList() {
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortAttribute, setSortAttribute] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        const fetchAmenities = async () => {
            try {
                const response = await api.get("/api/amenity/view");
                setAmenities(response.data);
            } catch (error) {
                setError("Failed to load amenities. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAmenities();
    }, []);

    const filteredAmenities = amenities.filter((amenity) =>
        amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedAmenities = [...filteredAmenities].sort((a, b) => {
        const attributeA = a[sortAttribute];
        const attributeB = b[sortAttribute];

        if (attributeA < attributeB) return sortOrder === "asc" ? -1 : 1;
        if (attributeA > attributeB) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    if (loading) return <p>Loading amenities...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="amenities-list-container">
            <h2 className="amenities-list-header">Amenities</h2>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search amenities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input search-input"
            />

            {/* Sorting options */}
            <div className="sort-controls">
                <label>Sort by: </label>
                <select
                    value={sortAttribute}
                    onChange={(e) => setSortAttribute(e.target.value)}
                    className="form-input sort-select"
                >
                    <option value="name">Name</option>
                    <option value="section">Section</option>
                    <option value="date">Date</option>
                </select>

                <label>Order: </label>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="form-input sort-select"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {/* Display sorted list of amenities */}
            {sortedAmenities.length > 0 ? (
                sortedAmenities.map((amenity) => (
                    <div key={amenity.id} className="amenities-list-item">
                        <h3 className="amenity-title">{amenity.name}</h3>
                        <p className="amenity-details">Description: {amenity.description}</p>
                        <p className="amenity-details">Room Number: {amenity.roomNumber}</p>
                        <p className="amenity-details">Status: {amenity.status}</p>
                        {/* Display image if available */}
                        {amenity.image && <img src={amenity.image} alt={`${amenity.name}`} className="amenity-image" />}
                        <p className="amenity-details">Rules: {amenity.rules || "None"}</p>
                    </div>
                ))
            ) : (
                <p>No amenities match your search.</p>
            )}
        </div>
    );
}

export default AmenitiesList;