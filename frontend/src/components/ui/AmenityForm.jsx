import React, { useState } from 'react';

const AmenityForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [image, setImage] = useState('');
    const [occupied, setOccupied] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, description, capacity, image, occupied });
        setName(''); setDescription(''); setCapacity(0); setImage(''); setOccupied(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col bg-white p-6 rounded-md shadow-md max-w-lg">
            <label className="text-gray-700 font-semibold mb-1">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded mb-3"/>

            <label className="text-gray-700 font-semibold mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="p-2 border rounded mb-3"/>

            <label className="text-gray-700 font-semibold mb-1">Capacity</label>
            <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="p-2 border rounded mb-3"/>

            <label className="text-gray-700 font-semibold mb-1">Image URL</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="p-2 border rounded mb-3"/>

            <div className="flex items-center mb-3">
                <input type="checkbox" checked={occupied} onChange={(e) => setOccupied(e.target.checked)} />
                <span className="ml-2 text-gray-700">Occupied</span>
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Save Amenity</button>
        </form>
    );
};

export default AmenityForm;
