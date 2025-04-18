import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext'; // Import AppContext
import { toast } from 'react-hot-toast'; // Import react-hot-toast
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Profile = () => {
  const navigate = useNavigate(); // To redirect after saving profile
  const { user, setUser } = useAppContext(); // Get user from context
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');  // Email is non-editable, fetched from user
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');

  // Pre-fill the form with existing user data if available
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');  // Email is fixed, set from user data
      setIdentityNumber(user.identityNumber || '');
      setBirthDate(user.birthDate || '');
      setAddress(user.address || '');
    }
  }, [user]);

  // Handle form submission to update profile
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!fullName || !identityNumber || !birthDate || !address) {
      toast.error('Please fill out all fields!'); // Show toast error message
      return;
    }

    // Check if passwords match (if the user wants to change their password)
    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match!'); // Show toast error message
      return;
    }

    // Check password length (must be at least 8 characters)
    if (password && password.length < 8) {
      toast.error('Password must be at least 8 characters long!'); // Show toast error message
      return;
    }

    // Age validation: User must be at least 17 years old
    const age = calculateAge(birthDate);

    if (age < 17) {
      toast.error("You must be at least 17 years old.");
      return; // Prevent form submission if age is invalid
    }

    // Create updated user data
    const updatedUser = { 
      ...user, 
      fullName,
      password: password || user.password,  // Update password only if provided
      identityNumber, 
      birthDate, 
      address 
    };

    // Update the user data in context (temporary for now)
    setUser(updatedUser); // Update the user state in AppContext
    toast.success('Profile updated successfully!'); // Show toast success message

    // Redirect to home page after saving profile
    navigate('/'); // Redirect immediately without timeout
  };

  // Validate if the entered identity number is numeric
  const handleIdentityNumberChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {  // Only accept numbers
      setIdentityNumber(value);
    }
  };

  // Age calculation function based on birthdate
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();

    // Check if the current date has passed the birthday this year
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      return age - 1; // Subtract 1 if the birthday hasn't occurred yet this year
    }
    return age;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-primary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="mt-2 p-3 w-full border rounded-md bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Identity Number</label>
            <input
              type="text"
              value={identityNumber}
              onChange={handleIdentityNumberChange} // Validate input for numbers
              className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your identity number (KTP/SIM/Passport)"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Birth Date</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)} // Update birthdate state
              className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
              required
              />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">New Password (Leave blank if no change)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your new password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your new password"
              />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
