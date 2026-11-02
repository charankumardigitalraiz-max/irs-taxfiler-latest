import apiClient from '../api/client';

// Service for admin user management
export const userService = {
  // Get list of users with filters
  getUsers: async (params = {}) => {
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
  },

  // Get single user by id
  getUserById: async (id) => {
    const response = await apiClient.get(`/admin/users/${id}`);
    return response.data;
  },

  // Admin register user (complete registration on behalf of user)
  registerUser: async (id, data) => {
    const response = await apiClient.post(`/admin/users/${id}/register`, data);
    return response.data;
  },

  // Send OTP to user email (reuse client auth endpoint)
  sendOtpToUser: async (email) => {
    const response = await apiClient.post('/client/auth/send-otp', { email });
    return response.data;
  },

  // Verify OTP on behalf of user (admin reads OTP from user)
  verifyOtpForUser: async (email, otp) => {
    const response = await apiClient.post('/client/auth/verify-otp', { email, otp });
    return response.data;
  },

  // Get user timeline
  getUserTimeline: async (id) => {
    const response = await apiClient.get(`/admin/users/${id}/timeline`);
    return response.data;
  },

  // Update user profile (admin can update user details)
  updateUserProfile: async (userId, data) => {
    const response = await apiClient.patch(`/admin/users/${userId}`, data);
    return response.data;
  },

  // Update tax preparation data
  updateTaxPreparation: async (userId, data) => {
    const response = await apiClient.patch(`/admin/users/${userId}/tax-preparation`, data);
    return response.data;
  },

  // Delete single user
  deleteUser: async (id) => {
    const response = await apiClient.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Bulk delete users
  deleteUsers: async (userIds) => {
    const response = await apiClient.post('/admin/users/bulk-delete', { userIds });
    return response.data;
  },

  // Toggle user active/inactive status
  toggleUserStatus: async (userId) => {
    const response = await apiClient.patch(`/admin/users/${userId}/toggle-active`);
    return response.data;
  },
};


