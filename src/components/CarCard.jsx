import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChair, FaSnowflake, FaCar, FaMapMarkerAlt } from 'react-icons/fa';

// Static car card component
const CarCard = ({ car, pickupDate, returnDate }) => {
  const navigate = useNavigate();

  // This function handles the "Book" button click
  const handleBookClick = () => {
    // Navigate to the booking page and pass the car data and dates as state
    navigate('/booking', { state: { car, pickupDate, returnDate } });
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-80">
      <img 
        src={car.image} 
        alt={car.name} 
        className="w-full h-48 object-cover rounded-lg mb-4" 
      />
      <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{car.description}</p>
      <div className="flex items-center text-gray-600 mb-2">
        <FaMapMarkerAlt className="text-lg mr-1" /> {/* Location Pin Icon */}
        <span>{car.location}</span>
      </div>
      
      {/* Icon Section for Seats, AC, and Transmission */}
      <div className="flex gap-3 mb-4">
        <div className="flex items-center text-gray-600">
          <FaChair className="text-lg mr-1" /> {/* Chair Icon */}
          <span>{car.seats} Seats</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <FaSnowflake className="text-lg mr-1" /> {/* AC Icon */}
          <span>{car.airConditioning ? 'AC' : 'No AC'}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <FaCar className="text-lg mr-1" /> {/* Car Icon for Transmission */}
          <span>{car.transmission}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-semibold text-xl text-primary">{`IDR ${car.price} / Day`}</p>
        <button onClick={handleBookClick} className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Book
        </button>
      </div>
    </div>
  );
};

export default CarCard;
