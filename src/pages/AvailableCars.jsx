import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import CarCard from '../components/CarCard'; 
import { cars } from '../context/CarsData'; // Import cars data from carsData.js

const AvailableCars = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [filteredCars, setFilteredCars] = useState([]); // Store filtered cars
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query params from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialPickupLocation = queryParams.get('pickupLocation');
  const initialPickupDate = queryParams.get('pickupDate');
  const initialPickupTime = queryParams.get('pickupTime');
  const initialReturnDate = queryParams.get('returnDate');
  const initialReturnTime = queryParams.get('returnTime');

  // Set initial values based on URL parameters
  useEffect(() => {
    setPickupLocation(initialPickupLocation || '');
    setPickupDate(initialPickupDate || '');
    setPickupTime(initialPickupTime || '');
    setReturnDate(initialReturnDate || '');
    setReturnTime(initialReturnTime || '');
  }, [initialPickupLocation, initialPickupDate, initialPickupTime, initialReturnDate, initialReturnTime]);

  // Convert string dates to Date objects for comparison
  const parseDate = (dateString) => {
    return new Date(dateString);
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!pickupLocation || !pickupDate || !pickupTime || !returnDate || !returnTime) {
      toast.error('Semua kolom wajib diisi!');
      return; // Do not proceed if there are empty fields
    }

    // Create a new URLSearchParams object with updated search parameters
    const updatedParams = new URLSearchParams();
    updatedParams.set('pickupLocation', pickupLocation);
    updatedParams.set('pickupDate', pickupDate);
    updatedParams.set('pickupTime', pickupTime);
    updatedParams.set('returnDate', returnDate);
    updatedParams.set('returnTime', returnTime);

    // Navigate to the updated URL with the new search parameters
    navigate(`/available-cars?${updatedParams.toString()}`);
  };

  // Filter cars based on search parameters (pickup location, date, etc.)
  useEffect(() => {
    if (!pickupLocation || !pickupDate || !returnDate) {
      return; // Do not filter if any essential fields are empty
    }

    const filteredCars = cars.filter((car) => {
      const availableFrom = parseDate(car.availableFrom);
      const availableUntil = parseDate(car.availableUntil);
      const pickup = parseDate(pickupDate);
      const returnDateObj = parseDate(returnDate);

      // Check if the car is available within the pickup and return date range
      const isDateAvailable = pickup >= availableFrom && returnDateObj <= availableUntil;

      // Also check if the car matches the location filter
      const isLocationMatch = car.location.toLowerCase().includes(pickupLocation.toLowerCase());

      // Only include cars that match both date and location filters
      return isDateAvailable && isLocationMatch;
    });

    setFilteredCars(filteredCars); // Update the filtered cars list
  }, [pickupLocation, pickupDate, returnDate]); // Re-run effect when search params change

  return (
    <div className="container mx-auto p-6 mt-6 mb-24">
      <h1 className="text-3xl text-center font-semibold text-gray-800 mb-8">Available Cars</h1>

      {/* Display Search Parameters in Editable Input Fields (Flex layout) */}
      <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
        {/* Pickup Location */}
        <div className="flex-1">
          <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">Pickup Location</label>
          <input
            type="text"
            id="pickupLocation"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md"
            placeholder="Masukkan lokasi"
          />
        </div>

        {/* Date Range Picker (Pickup and Return Date) */}
        <div className="flex-1">
          <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">Tanggal Rental</label>
          <DatePicker
            selected={pickupDate ? new Date(pickupDate) : null}
            onChange={(update) => {
              setPickupDate(update[0]); // Set the start date (pickup date)
              setReturnDate(update[1]); // Set the end date (return date)
            }}
            startDate={pickupDate ? new Date(pickupDate) : null}
            endDate={returnDate ? new Date(returnDate) : null}
            selectsRange
            className="p-2 w-full border rounded-md mt-2"
            dateFormat="dd/MM/yyyy"
            placeholderText="Pilih Tanggal Pickup dan Kembali"
          />
        </div>

        {/* Pickup Time */}
        <div className="flex-1">
          <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">Waktu Pickup</label>
          <input
            type="time"
            id="pickupTime"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md"
          />
        </div>

        {/* Return Time */}
        <div className="flex-1">
          <label htmlFor="returnTime" className="block text-sm font-medium text-gray-700">Waktu Pengembalian</label>
          <input
            type="time"
            id="returnTime"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md"
          />
        </div>

        {/* Search Button */}
        <div className="flex justify-center items-center mt-6 w-full">
          <button type="submit" className="bg-primary text-white py-2 px-6 rounded-md shadow-md hover:bg-primary-dull transition-colors duration-200">
            Cari
          </button>
        </div>
      </form>

      {/* Display Car Results Here */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))
        ) : (
          <p>No cars available for the selected dates.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableCars;
