import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create AppContext to handle global state for authentication
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // States
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);  // Check localStorage for user
  const [isRenter, setIsRenter] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);  // Toggle for showing user login

  // Login function to update user state
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));  // Save user to localStorage
    navigate('/');  // Redirect to home page after login
  };

  // Logout function to clear user state
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');  // Remove user from localStorage
    navigate('/login');  // Redirect to login page after logout
  };

  // Initialize the app state from localStorage on load
  useEffect(() => {
    if (user) {
      setShowUserLogin(true);  // Show login-related UI if the user is logged in
    } else {
      setShowUserLogin(false);  // Show login button if the user is not logged in
    }
  }, [user]);

  const value = {
    navigate,
    user,
    setUser,
    login,
    logout,
    isRenter,
    setIsRenter,
    showUserLogin,
    setShowUserLogin
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};
