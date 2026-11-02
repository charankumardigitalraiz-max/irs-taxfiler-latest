import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { hasPermission, hasAnyPermission } from '../utils/permissions';
import { ROLES } from '../utils/constants';
import { authService } from '../services/authService';

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated, login, logout, getRole, updateUser } = useAuthStore();

  // Verify token and fetch admin data on mount if token exists
  useEffect(() => {
    const verifyToken = async () => {
      const currentToken = useAuthStore.getState().token;
      const currentUser = useAuthStore.getState().user;

      if (currentToken && !currentUser) {
        try {
          const response = await authService.getMe();
          if (response.success && response.admin) {
            updateUser(response.admin);
          }
        } catch (error) {
          // Token is invalid, logout
          logout();
        }
      }
    };

    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const handleLogin = useCallback(async (email, password) => {
    try {
      const response = await authService.login(email, password);

      if (response.success && response.token && response.admin) {
        login(response.admin, response.token);
        navigate('/admin');
        return { success: true };
      } else {
        return {
          success: false,
          message: response.message || 'Login failed. Please try again.'
        };
      }
    } catch (error) {
      // Error is already handled by API interceptor with toast
      // Return error message for component-level handling
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An error occurred during login. Please try again.';

      return {
        success: false,
        message: errorMessage
      };
    }
  }, [login, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/admin/login');
  }, [logout, navigate]);

  const checkPermission = useCallback((permission) => {
    if (!user) return false;
    // Main Admin / Super Admin bypass
    if (user.isMainAdmin || user.role === 'Super Admin' || user.role === 'super_admin') return true;

    // Check dynamic permissions array
    if (user.permissions && user.permissions.includes(permission)) return true;

    // Fallback to role-based check if permissions array is missing (legacy)
    const role = user.role;
    if (!role) return false;
    // Try to normalize for legacy check if needed, but prefer dynamic
    return hasPermission(role, permission);
  }, [user]);

  const checkAnyPermission = useCallback((permissions) => {
    if (!user) return false;
    // Main Admin / Super Admin bypass
    if (user.isMainAdmin || user.role === 'Super Admin' || user.role === 'super_admin') return true;

    // Check dynamic permissions array
    if (user.permissions && permissions.some(perm => user.permissions.includes(perm))) return true;

    // Fallback
    const role = user.role;
    if (!role) return false;
    return hasAnyPermission(role, permissions);
  }, [user]);

  return {
    user,
    token,
    isAuthenticated,
    role: user?.role,
    login: handleLogin,
    logout: handleLogout,
    checkPermission,
    checkAnyPermission,
  };
};

export default useAuth;

