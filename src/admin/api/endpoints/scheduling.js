import apiClient from '../client';

export const schedulingApi = {
  // Get all meetings
  getAll: async (params = {}) => {
    const response = await apiClient.get('/admin/meetings', { params });
    return response.data;
  },

  // Get meeting by ID
  getById: async (id) => {
    const response = await apiClient.get(`/admin/meetings/${id}`);
    return response.data;
  },

  // Create new meeting
  create: async (data) => {
    const response = await apiClient.post('/admin/meetings', data);
    return response.data;
  },

  // Update meeting
  update: async (id, data) => {
    const response = await apiClient.patch(`/admin/meetings/${id}`, data);
    return response.data;
  },

  // Get meetings for a specific user
  getByUser: async (userId) => {
    const response = await apiClient.get(`/admin/users/${userId}/meetings`);
    return response.data;
  },

  // Update meeting status
  updateStatus: async (id, status, notes = '') => {
    const response = await apiClient.patch(`/admin/meetings/${id}`, {
      status,
      notes,
    });
    return response.data;
  },
};

export default schedulingApi;

