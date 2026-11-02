import apiClient from '../api/client';

export const authService = {
  // Admin login
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  // Admin registration
  register: async (data) => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  // Check if any admin already exists (controls public registration)
  hasAdmin: async () => {
    const response = await apiClient.get('/auth/has-admin');
    return response.data;
  },

  // Get current admin
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Update profile
  updateProfile: async (data) => {
    const response = await apiClient.patch('/auth/profile', data);
    return response.data;
  },

  // Update password
  updatePassword: async (currentPassword, newPassword) => {
    const response = await apiClient.patch('/auth/password', { currentPassword, newPassword });
    return response.data;
  },

  // Logout (client-side only)
  logout: () => {
    // Token removal is handled by the auth store
  },
};

