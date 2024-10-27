import React from 'react';

const AmenityCard = ({ amenity }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md m-2 max-w-sm">
            <img src={amenity.image} alt={amenity.name} className="h-32 w-full object-cover rounded-md mb-2"/>
            <h2 className="text-lg font-semibold">{amenity.name}</h2>
            <p className="text-gray-600">{amenity.description}</p>
            <p className="text-sm text-gray-500">Capacity: {amenity.capacity}</p>
            <p className={`text-sm mt-2 ${amenity.occupied ? 'text-red-500' : 'text-green-500'}`}>
                {amenity.occupied ? 'Occupied' : 'Available'}
            </p>
        </div>
    );
};

export default AmenityCard;
