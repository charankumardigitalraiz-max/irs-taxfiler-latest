import apiClient from '../client';

export const taxprepApi = {
  // Get all tax preparations
  getAll: async (params = {}) => {
    const response = await apiClient.get('/admin/tax-preparations', { params });
    return response.data;
  },

  // Get tax preparation for a specific user
  getByUser: async (userId) => {
    const response = await apiClient.get(`/admin/users/${userId}/tax-prep`);
    return response.data;
  },

  // Create new tax preparation (Phase 1)
  create: async (userId, data) => {
    const response = await apiClient.post(`/admin/users/${userId}/tax-prep`, data);
    return response.data;
  },

  // Update tax preparation
  update: async (id, data) => {
    const response = await apiClient.patch(`/admin/tax-prep/${id}`, data);
    return response.data;
  },

  // Send summary to client
  sendSummary: async (id) => {
    const response = await apiClient.post(`/admin/tax-prep/${id}/send-summary`);
    return response.data;
  },

  // Complete Phase 2
  completePhase2: async (id, data) => {
    const response = await apiClient.post(`/admin/tax-prep/${id}/phase2`, data);
    return response.data;
  },

  // Lock tax preparation
  lock: async (id) => {
    const response = await apiClient.post(`/admin/tax-prep/${id}/lock`);
    return response.data;
  },
};

export default taxprepApi;

