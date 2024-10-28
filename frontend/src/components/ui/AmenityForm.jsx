import React, { useState } from 'react';

const AmenityForm = ({ onSubmit, initialData = {} }) => {
    const [name, setName] = useState(initialData.name || "");
    const [description, setDescription] = useState(initialData.description || "" );
    const [roomNumber, setRoomNumber] = useState(initialData.roomNumber || "");
    const [image, setImage] = useState(initialData.image || "");
    const [rules, setRules] = useState(initialData.rules || "");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!name.trim()) {
            setError("Name is required.");
            return;
        }
        if (!description.trim()) {
            setError("Description is required.");
            return;
        }
        if (!roomNumber.trim()) {
            setError("Room number is required.");
            return;
        }

        setLoading(true);
        await onSubmit({ name, description, roomNumber, image, rules });
        setLoading(false);

        if (!initialData.id) {
            setName("");
            setDescription("");
            setRoomNumber("");
            setImage("");
            setRules("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow-lg space-y-4">
            <h2 className="text-xl font-bold mb-4">{initialData.id ? "Edit Amenity" : "Create Amenity"}</h2>

            {error && <p className="text-red-500">{error}</p>}

            <div>
                <label className="block text-gray-700 font-semibold">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                    required
                ></textarea>
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Room Number/ID</label>
                <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Image URL</label>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                />
            </div>
            <div>
                <label className="block text-gray-700 font-semibold">Rules</label>
                <textarea
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring"
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
                disabled={loading}
            >
                {loading ? "Submitting..." : initialData.id ? "Update Amenity" : "Create Amenity"}
            </button>
        </form>
    );
};

export default AmenityForm;

