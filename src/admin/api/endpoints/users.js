import apiClient from '../client';

export const usersApi = {
  // Get all users with pagination and filters
  getAll: async (params = {}) => {
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
  },
  
  // Get single user by ID
  getById: async (id) => {
    const response = await apiClient.get(`/admin/users/${id}`);
    return response.data;
  },
  
  // Get user timeline/workflow history
  getTimeline: async (id) => {
    const response = await apiClient.get(`/admin/users/${id}/timeline`);
    return response.data;
  },
  
  // Assign staff to user
  assignStaff: async (userId, staffId) => {
    const response = await apiClient.post(`/admin/users/${userId}/assign`, {
      staffId,
    });
    return response.data;
  },
  
  // Add admin note
  addNote: async (userId, note) => {
    const response = await apiClient.post(`/admin/users/${userId}/notes`, {
      note,
    });
    return response.data;
  },
  
  // Get admin notes
  getNotes: async (userId) => {
    const response = await apiClient.get(`/admin/users/${userId}/notes`);
    return response.data;
  },
  
  // Update user status
  updateStatus: async (userId, status, notes = '') => {
    const response = await apiClient.patch(`/admin/users/${userId}/status`, {
      status,
      notes,
    });
    return response.data;
  },
};

export default usersApi;

