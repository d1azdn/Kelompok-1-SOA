import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the booking data from location.state
  const { car, pickupDate, returnDate } = location.state || {};

  // If no booking data exists, redirect to home
  useEffect(() => {
    if (!car) {
      toast.error('Booking data not found!');
      navigate('/');
    }
  }, [car, navigate]);

  if (!car) return null; // If car data is missing, stop rendering

  // Format dates using toLocaleDateString
  const formattedPickupDate = new Date(pickupDate).toLocaleDateString();
  const formattedReturnDate = new Date(returnDate).toLocaleDateString();
  
  const [paymentAmount, setPaymentAmount] = useState(car.price); // Default payment amount to the car price

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Basic validation for payment
    if (paymentAmount <= 0) {
      toast.error('Invalid payment amount!');
      return;
    }

    // Proceed to confirm payment
    toast.success('Payment successful!');
    
    // Here you can update the status of the booking and then redirect
    navigate('/historytransaction', { state: { transactionId: '123', status: 'on-going' } });
  };

  return (
    <div className="container mx-auto p-6 mt-6 mb-24">
      <h1 className="text-3xl text-center font-semibold text-gray-800 mb-8">Payment</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{car.name}</h3>
        
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
            {/* Here you can display a real QR code or generate one for demo */}
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj1tNbNyUkqJqe9bzm3MsY3r2AViejHGaNZIhxYDsRW194M1Z9Dv9U-ywfaPQgven6p2P03AyaPbg6DyWkX3p-iw0GF7SwnRXOhJxSgdCXtAGJx2gojDfG0Tty1S_2blt7EP8TwJ3yaMps/s911/QRIS+MASJID+ABU+BAKAR+ASSHIDIQ-page-003.jpg" alt="Payment QR" className="mb-4" />
            <p>Please scan this QR code or use the details above to complete the payment.</p>
          </div>

          {/* Confirm Payment Button */}
          <button type="submit" className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dull">
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
