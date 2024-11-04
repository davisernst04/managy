'use client';

import {useEffect, useState} from "react";
import api from "../../api.js";
import "./createAmenity.css";
import LoadingIndicator from "@/components/LoadingIndicator.jsx";

function CreateAmenity() {
    const [amenityName, setAmenityName] = useState("");
    const [description, setDescription] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [rules, setRules] = useState("");
    const [loading, setLoading] = useState(false);
    const [amenities, setAmenities] = useState([]);

    useEffect(() => {
        const fetchAmenities = async () => {
            try {
                const response = await api.get("/api/amenity/list");
                setAmenities(response.data);
            } catch (error) {
                console.error("Failed to load amenities:", error);
            }
        };
        fetchAmenities();
    }, []);

    const existingAmenities = amenities.map(a => a.name.toLowerCase());

    const handleCreateAmenity = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (amenityName.trim() === "") {
            alert("Amenity Name cannot be empty.");
            setLoading(false);
            return;
        }

        if (existingAmenities.includes(amenityName.toLowerCase())) {
            alert("An amenity with this name already exists. Please try again later.");
            setLoading(false);
            return;
        }

        if (isNaN(roomNumber) || roomNumber.trim() === "" ) {
            alert("Room number cannot be empty.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post("api/amenity/create/", {
                name: amenityName,
                description,
                roomNumber,
                image: imageURL,
                rules,
            });

            if (response.status === 201) {
                alert("Amenity successfully added!");
                setAmenityName("");
                setDescription("");
                setRoomNumber("");
                setImageURL("");
                setRules("");
            } else {
                alert("Failed to add amenity.");
            }
        } catch (error) {
            alert("An error occurred: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-container">
            <form onSubmit={handleCreateAmenity} className="form-container">
                <h1 className="form-title">Add a New Amenity</h1>

                <input
                    className="form-input"
                    type="text"
                    value={amenityName}
                    onChange={(e) => setAmenityName(e.target.value)}
                    placeholder="Amenity Name"
                    required
                />

                <textarea
                    className="form-input description-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Amenity Description"
                    required
                ></textarea>

                <input
                    className="form-input"
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    placeholder="Room Number/ID"
                    required
                />

                <input
                    className="form-input"
                    type="url"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    placeholder="Image URL"
                />

                <textarea
                    className="form-input rules-input"
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                    placeholder="Rules (optional)"
                ></textarea>

                {loading && <LoadingIndicator />}

                <button className="form-button" type="submit">
                    {loading ? "Adding..." : "Add Amenity"}
                </button>
            </form>
        </div>
    );
}

export default CreateAmenity;