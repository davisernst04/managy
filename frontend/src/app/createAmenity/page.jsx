'use client';

import { useState } from "react";
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
    const [error, setError] = useState(null);

    const handleCreateAmenity = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!amenityName.trim()) {
            setError("Amenity Name is required.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post("/api/amenity/create/", {
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
            setError("An error occurred: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-container">
            <form onSubmit={handleCreateAmenity} className="form-container">
                <h1 className="form-title">Add a New Amenity</h1>

                {error && <p className="error-message">{error}</p>}

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

                <button className="form-button" type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Amenity"}
                </button>
            </form>
        </div>
    );
}

export default CreateAmenity;
