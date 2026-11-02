import apiClient from '../client';

export const teamApi = {
  // Get all team members
  getAll: async (params = {}) => {
    const response = await apiClient.get('/admin/team', { params });
    return response.data;
  },

  // Get team member by ID
  getById: async (id) => {
    const response = await apiClient.get(`/admin/team/${id}`);
    return response.data;
  },

  // Create new team member
  create: async (data) => {
    const response = await apiClient.post('/admin/team', data);
    return response.data;
  },

  // Update team member
  update: async (id, data) => {
    const response = await apiClient.patch(`/admin/team/${id}`, data);
    return response.data;
  },

  // Delete team member
  delete: async (id) => {
    const response = await apiClient.delete(`/admin/team/${id}`);
    return response.data;
  },

  // Toggle active status
  toggleActive: async (id, isActive) => {
    const response = await apiClient.patch(`/admin/team/${id}`, { isActive });
    return response.data;
  },
};

export default teamApi;

