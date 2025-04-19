import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAppContext(); // Check if user is logged in
  const isProfileComplete = user?.fullName && user?.identityNumber && user?.birthDate && user?.address; // Check if profile is complete

  // If the user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the profile is not complete, redirect to the profile page
  if (!isProfileComplete) {
    return <Navigate to="/profile" />;
  }

  // If everything is fine, return the element (booking page)
  return element;
};

export default ProtectedRoute;
