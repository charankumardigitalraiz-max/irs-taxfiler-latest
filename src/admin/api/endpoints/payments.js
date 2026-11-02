import apiClient from '../client';

export const paymentsApi = {
  // Get all payments
  getAll: async (params = {}) => {
    const response = await apiClient.get('/admin/payments', { params });
    return response.data;
  },

  // Get payments for a specific user
  getByUser: async (userId) => {
    const response = await apiClient.get(`/admin/users/${userId}/payments`);
    return response.data;
  },

  // Confirm payment manually
  confirm: async (id, data) => {
    const response = await apiClient.post(`/admin/payments/${id}/confirm`, data);
    return response.data;
  },

  // Update payment
  update: async (id, data) => {
    const response = await apiClient.patch(`/admin/payments/${id}`, data);
    return response.data;
  },
};

export default paymentsApi;

