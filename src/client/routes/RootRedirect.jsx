import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

// Decide where to send the client when they hit "/" or "/client"
// If they already have a valid auth token, send them to dashboard.
// Otherwise, send them to the login screen.
const RootRedirect = () => {
  const authed = isAuthenticated();
  return authed ? (
    <Navigate to="/client/dashboard" replace />
  ) : (
    <Navigate to="/client/login" replace />
  );
};

export default RootRedirect;


