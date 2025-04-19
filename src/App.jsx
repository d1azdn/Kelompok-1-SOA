import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Slider from './pages/Slider';
import Search from './components/Search';
import About from './components/About';
import AvailableCars from './pages/AvailableCars';
import Reasons from './components/Reasons';
import Testimonials from './components/Testimonials';
import CarGallery from './components/CarGallery';
import Booking from './pages/Booking';
import Register from './pages/Register';  // Register page
import Login from './pages/Login';  // Login page
import Profile from './pages/Profile'; // Profile page
import ProtectedRoute from './context/ProtectedRoute';
import Payment from './pages/Payment'; // Payment page
import HistoryTransaction from './pages/HistoryTransaction'; // HistoryTransaction page
// import HistoryTransactionDetails from './pages/HistoryTransactionDetails';

const App = () => {
  
  const location = useLocation();
  useEffect(() => {
    if (location.hash === '#about') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]); 

  return (
    <div>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <>
            <Slider />
            <Search />
            <CarGallery />
            <About id="about" />
            <Reasons />
            <Testimonials />
          </>
        } />
        
        {/* Available Cars Page */}
        <Route path="/available-cars" element={<AvailableCars />} />

        {/* Booking Page */}
        <Route path="/booking" element={<ProtectedRoute element={<Booking />} />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Profile Page (for filling out additional details) */}
        <Route path="/profile" element={<Profile />} />

        {/* Payment Page */}
        <Route path="/payment" element={<ProtectedRoute element={<Payment />} />} />

        {/* History Transaction Page (Displays all transactions) */}
        <Route path="/historytransaction" element={<ProtectedRoute element={<HistoryTransaction />} />} />

        {/* History Transaction Details Page (Displays specific transaction details) */}
        {/* <Route path="/historytransaction/:transactionId" element={<ProtectedRoute element={<HistoryTransactionDetails />} />} /> */}
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
