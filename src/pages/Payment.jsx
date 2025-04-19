import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the booking data from location.state
  const { car, pickupDate, returnDate, userName, userEmail, identityNumber, birthDate, address, price } = location.state || {};

  // If no booking data exists, redirect to home
  useEffect(() => {
    if (!car) {
      toast.error('Booking data not found!');
      navigate('/');
    }
  }, [car, navigate]);

  if (!car) return null; // If car data is missing, stop rendering

  // Format the dates (pickupDate and returnDate) before displaying
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB'); // Format date to dd/MM/yyyy
  };

  const formattedPickupDate = formatDate(pickupDate);
  const formattedReturnDate = formatDate(returnDate);

  const [paymentAmount, setPaymentAmount] = useState(price || car.price); // Default payment amount to the car price

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (paymentAmount <= 0) {
      toast.error('Invalid payment amount!');
      return;
    }

    // Simulate successful payment confirmation
    toast.success('Payment successful!');

    // Simulate saving the transaction to localStorage and redirecting
    const updatedTransaction = {
      ...location.state,
      status: 'on-going',
    };

    // Save the updated transaction to localStorage
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const updatedTransactions = storedTransactions.map((transaction) =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

    // Redirect to the HistoryTransaction page
    navigate('/historytransaction');
  };

  return (
    <div className="container mx-auto p-6 mt-6 mb-24">
      <h1 className="text-3xl text-center font-semibold text-gray-800 mb-8">Payment</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{car.name}</h3>
        <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded-lg mb-4" />

        <div className="mt-4">
          <p><strong>Pickup Location:</strong> {car.location}</p>
          <p><strong>Rental Dates:</strong> {formattedPickupDate} to {formattedReturnDate}</p>
          <p><strong>Price per Day:</strong> IDR {car.price.toLocaleString()}</p>
          <p><strong>Total Payment:</strong> IDR {paymentAmount.toLocaleString()}</p>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePaymentSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">Total Amount</label>
            <input
              type="number"
              id="paymentAmount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="mt-2 p-2 w-full border rounded-md"
              disabled // Disabling because it's showing the calculated amount
            />
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-800">Payment Details</h4>
            <p><strong>Transfer Amount:</strong> IDR {paymentAmount.toLocaleString()}</p>
            <p><strong>Payment QR Code:</strong></p>
            <img src="https://via.placeholder.com/150" alt="Payment QR" className="mb-4" />
            <p>Please scan this QR code or use the details above to complete the payment.</p>
          </div>

          <button type="submit" className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dull">
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
