import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const HistoryTransactionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { transactionId } = location.state || {}; // Get the transaction ID from state
  const transaction = getTransactionById(transactionId); // Fetch transaction data by ID
  
  if (!transaction) {
    toast.error('Transaction not found!');
    navigate('/historytransaction');
    return null;
  }

  const handleConfirmPayment = () => {
    if (transaction.status === 'pending') {
      // Update the status to "On-Going Rent"
      transaction.status = 'on-going';
      toast.success('Payment confirmed! Enjoy your car.');
    }
  };

  const handleReturnCar = () => {
    if (transaction.status === 'on-going') {
      // Update the status to "Returned"
      transaction.status = 'returned';
      toast.success('Thank you for returning the car!');
    }
  };

  return (
    <div className="container mx-auto p-6 mt-6 mb-24">
      <h1 className="text-3xl text-center font-semibold text-gray-800 mb-8">Transaction Details</h1>

      {/* Display Transaction Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800">{transaction.car.name}</h3>
        <p><strong>Status:</strong> {transaction.status}</p>
        <p><strong>Pickup Date:</strong> {transaction.pickupDate}</p>
        <p><strong>Return Date:</strong> {transaction.returnDate}</p>
        <p><strong>Total Price:</strong> IDR {transaction.price.toLocaleString()}</p>

        {/* Payment Section for Pending Status */}
        {transaction.status === 'pending' && (
          <div className="mt-4">
            <h4 className="font-semibold text-gray-800">Payment Details</h4>
            <p><strong>Transfer Amount:</strong> IDR {transaction.price.toLocaleString()}</p>
            <p><strong>Payment QR Code:</strong></p>
            <img src="https://via.placeholder.com/150" alt="Payment QR" />
            <button
              onClick={handleConfirmPayment}
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dull mt-4"
            >
              Confirm Payment
            </button>
          </div>
        )}

        {/* Ongoing Rent Section */}
        {transaction.status === 'on-going' && (
          <div className="mt-4">
            <h4 className="font-semibold text-gray-800">Thank You for Renting</h4>
            <p>Enjoy your ride! Please return the car by {transaction.returnDate}.</p>
            <button
              onClick={handleReturnCar}
              className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dull mt-4"
            >
              Confirm Return
            </button>
          </div>
        )}

        {/* Return Confirmation */}
        {transaction.status === 'returned' && (
          <div className="mt-4">
            <h4 className="font-semibold text-gray-800">Transaction Completed</h4>
            <p>Thank you for returning the car! Your booking is now complete.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Mock function to simulate fetching a transaction by ID
const getTransactionById = (id) => {
  // You would replace this with actual data fetching
  const transactions = [
    {
      id: 1,
      car: { name: 'Toyota Avanza', image: 'https://toyotagarutofficial.com/wp-content/uploads/2021/07/7_White-min.png' },
      pickupDate: '2025-04-01',
      returnDate: '2025-04-05',
      price: 300000,
      status: 'pending', // or 'on-going', 'returned'
    },
    {
      id: 2,
      car: { name: 'Honda CR-V', image: 'https://www.honda-arta.com/lib/images/item/crv%20putih.png' },
      pickupDate: '2025-04-10',
      returnDate: '2025-04-15',
      price: 400000,
      status: 'on-going',
    },
  ];

  return transactions.find((transaction) => transaction.id === id);
};

export default HistoryTransactionDetails;
