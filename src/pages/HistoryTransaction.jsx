import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryTransaction = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Retrieve the transactions from localStorage or other state management
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  const handleTransactionClick = (transactionId) => {
    navigate(`/historytransaction/${transactionId}`);
  };

  return (
    <div className="container mx-auto p-6 mt-6 mb-24">
      <h1 className="text-3xl text-center font-semibold text-gray-800 mb-8">Transaction History</h1>

      {/* Handle the loading state */}
      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800">{transaction.car.name}</h3>
              <p><strong>Status:</strong> {transaction.status}</p>
              <p><strong>Rental Dates:</strong> {transaction.pickupDate} to {transaction.returnDate}</p>

              {/* Safely handle price rendering */}
              <p><strong>Total Price:</strong> {transaction.price ? `IDR ${transaction.price.toLocaleString()}` : 'N/A'}</p>

              <button
                onClick={() => handleTransactionClick(transaction.id)}
                className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dull mt-4"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryTransaction;
