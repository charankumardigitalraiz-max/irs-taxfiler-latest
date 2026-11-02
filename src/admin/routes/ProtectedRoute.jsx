import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useAuthStore();

  // If no token or not authenticated, redirect to login
  if (!token || !isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;

