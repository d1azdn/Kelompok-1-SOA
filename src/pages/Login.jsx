import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAppContext()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email and password are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      toast.success(response.data.message);
      const token = response.data.token; 

      localStorage.setItem('token', token);

      login({ email }); 

      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-primary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;