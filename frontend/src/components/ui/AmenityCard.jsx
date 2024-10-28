import React from 'react';

const AmenityCard = ({ amenity, onDelete, onEdit }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md m-2 max-w-sm">
            <img src={amenity.image} alt={amenity.name} className="h-32 w-full object-cover rounded"/>
            <h2 className="text-lg font-semibold mt-2">{amenity.name}</h2>
            <p className="text-gray-600">{amenity.description}</p>
            <p className="text-sm text-gray-500">Room Number: {amenity.roomNumber}</p>
            <p className="text-sm mt-2 text-gray-700">{amenity.rules}</p>
            <div className="flex space-x-2 mt-4">
                <button onClick={() => onEdit(amenity)} className="w-full bg-yellow-500 text-white py-1 rounded
                hover:bg-yellow-600 focus:outline-none"> Edit
                </button>
                <button onClick={() => onDelete(amenity.id)} className="w-full bg-red-500 text-white py-1 rounded
                hover:bg-red-600 focus:outline-none"> Delete
                </button>
            </div>
        </div>
    );
};

export default AmenityCard;