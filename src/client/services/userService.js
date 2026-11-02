import { apiClient } from './authService';

export const userService = {
  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get('/client/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data) => {
    const response = await apiClient.patch('/client/profile', data);
    return response.data;
  },
};

