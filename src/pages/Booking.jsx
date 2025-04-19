import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'; // Import AppContext
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppContext(); // Get the user data from AppContext

  const { car, pickupDate, returnDate } = location.state || {};

  useEffect(() => {
    if (!car) {
      toast.error('Data mobil tidak tersedia!');
      navigate('/');
    }
  }, [car, navigate]);

  if (!car) return null;

  const [selectedPickupDate, setSelectedPickupDate] = useState('');
  const [selectedReturnDate, setSelectedReturnDate] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');

  // Car availability dates
  const availableFrom = new Date(car.availableFrom);
  const availableUntil = new Date(car.availableUntil);

  const isDatesMissing = !pickupDate || !returnDate;

  useEffect(() => {
    if (pickupDate && returnDate) {
      setSelectedPickupDate(new Date(pickupDate));
      setSelectedReturnDate(new Date(returnDate));
    }

    if (user) {
      setUserName(user.fullName || '');
      setUserEmail(user.email || '');
      setIdentityNumber(user.identityNumber || '');
      setBirthDate(user.birthDate || '');
      setAddress(user.address || '');
    }
  }, [pickupDate, returnDate, user]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!userName || !userEmail || !identityNumber || !birthDate || !address) {
      toast.error('Please complete your profile before booking!');
      return;
    }

    if (selectedPickupDate < availableFrom || selectedReturnDate > availableUntil) {
      toast.error('Selected dates are outside the car\'s availability period!');
      return;
    }

    // Save booking as a new transaction
    const transactionData = {
      id: new Date().getTime(),  // unique transaction ID
      car,
      pickupDate: selectedPickupDate,
      returnDate: selectedReturnDate,
      userName,
      userEmail,
      identityNumber,
      birthDate,
      address,
      status: 'need to pay', // Initially "need to pay"
    };

    // Store the transaction in localStorage (simulating a DB)
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    storedTransactions.push(transactionData);
    localStorage.setItem('transactions', JSON.stringify(storedTransactions));

    // Redirect to payment page
    navigate('/payment', { state: transactionData });
  };

  return (
    <div className="container mx-auto p-6 mt-6 mb-24">
      <h1 className="text-3xl text-center font-semibold text-gray-800 mb-8">Booking Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{car.name}</h3>
        <p className="text-sm text-gray-500">{car.description}</p>
        <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-lg mb-4" />

        {/* Form inputs here for user details, rental dates, etc. */}
        {/* Car Details */}
        <div className='mb-6'>
          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              <h4 className="font-semibold text-gray-800">Seats:</h4>
              <p>{car.seats} Seats</p>
            </div>
            <div className="w-1/2">
              <h4 className="font-semibold text-gray-800">Transmission:</h4>
              <p>{car.transmission}</p>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              <h4 className="font-semibold text-gray-800">Air Conditioning:</h4>
              <p>{car.airConditioning ? 'Yes' : 'No'}</p>
            </div>
            <div className="w-1/2">
              <h4 className="font-semibold text-gray-800">Location:</h4>
              <p>{car.location}</p>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              <h4 className="font-semibold text-gray-800">Availability:</h4>
              <p>{`From: ${car.availableFrom} to ${car.availableUntil}`}</p>
            </div>
            <div className="w-1/2">
              <h4 className="font-semibold text-gray-800">Price per Day:</h4>
              <p>IDR {car.price.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Date Picker */}
        {isDatesMissing && (
          <div className="mb-4">
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">Select Rental Dates</label>
            <DatePicker
              selected={selectedPickupDate || null}
              onChange={(update) => {
                setSelectedPickupDate(update[0]);
                setSelectedReturnDate(update[1]);
              }}
              startDate={selectedPickupDate || null}
              endDate={selectedReturnDate || null}
              selectsRange
              minDate={availableFrom} // Minimum date (available from)
              maxDate={availableUntil} // Maximum date (available until)
              className="p-2 w-full border rounded-md mt-2"
              dateFormat="dd/MM/yyyy"
              placeholderText="Pick Pickup and Return Dates"
            />
          </div>
        )}

        {/* User Info Form */}
        <form onSubmit={handleBookingSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-2 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="mt-2 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="identityNumber" className="block text-sm font-medium text-gray-700">Identity Number</label>
            <input
              type="text"
              id="identityNumber"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              className="mt-2 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-2 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 p-2 w-full border rounded-md"
              required
            />
          </div>

        <button type="submit" className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dull">
          Confirm Booking
        </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
