import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function ProtectedRoute() {
  /**
   * Guards nested routes to require authentication; redirects to /login if not authenticated.
   */
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
