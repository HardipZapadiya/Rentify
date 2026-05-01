import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// ProtectedRoute component is used to restrict access to certain routes
// based on authentication and user role
const ProtectedRoute = ({ adminOnly = false }) => {

  // Get user information from AuthContext
  const { userInfo } = useAuth();

  // Get current location to redirect back after login
  const location = useLocation();

  // If user is not logged in, redirect to login page
  // and save the current location (for redirect after login)
  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // If route is restricted to admin only and user is not admin,
  // redirect to home page
  if (adminOnly && userInfo.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }
  // If user is authenticated (and authorized if needed),
  // render the child routes using Outlet
  return <Outlet />;
};

export default ProtectedRoute;
