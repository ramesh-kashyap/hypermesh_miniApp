import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');

        // alert(token);
        if (!token) {
          setIsAuthenticated(false);
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
     <Loader/>
    );
  }
  return isAuthenticated ? children :<Navigate to="/" />;
};

export default ProtectedRoute;
