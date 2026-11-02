import apiClient from '../client';

export const filingApi = {
  // Get all filings
  getAll: async (params = {}) => {
    const response = await apiClient.get('/admin/filings', { params });
    return response.data;
  },

  // Get filing for a specific user
  getByUser: async (userId) => {
    const response = await apiClient.get(`/admin/users/${userId}/filing`);
    return response.data;
  },

  // Create new filing
  create: async (userId, data) => {
    const response = await apiClient.post(`/admin/users/${userId}/filing`, data);
    return response.data;
  },

  // Update filing
  update: async (id, data) => {
    const response = await apiClient.patch(`/admin/filings/${id}`, data);
    return response.data;
  },

  // Submit e-filing
  submit: async (id) => {
    const response = await apiClient.post(`/admin/filings/${id}/submit`);
    return response.data;
  },

  // Mark filing as complete
  complete: async (id) => {
    const response = await apiClient.post(`/admin/filings/${id}/complete`);
    return response.data;
  },

  // Update e-filing status
  updateEFilingStatus: async (id, status, rejectionReason = '') => {
    const response = await apiClient.patch(`/admin/filings/${id}`, {
      acceptanceStatus: status,
      rejectionReason,
      acceptanceDate: status === 'ACCEPTED' ? new Date().toISOString() : null,
    });
    return response.data;
  },
};

export default filingApi;

