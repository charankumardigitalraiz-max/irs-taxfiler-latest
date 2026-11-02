import apiClient from '../api/client';

export const formService = {
  // Get all form submissions
  getSubmissions: async (params = {}) => {
    const response = await apiClient.get('/forms/admin/all', { params });
    return response.data;
  },

  // Get form submission by ID
  getSubmission: async (id) => {
    const response = await apiClient.get(`/forms/admin/${id}`);
    return response.data;
  },

  // Update form submission status
  updateStatus: async (id, status, adminNotes) => {
    const response = await apiClient.patch(`/forms/admin/${id}/status`, {
      status,
      adminNotes,
    });
    return response.data;
  },

  // Get form statistics
  getStats: async () => {
    const response = await apiClient.get('/forms/admin/stats/overview');
    return response.data;
  },

  // Delete form submission
  deleteSubmission: async (id) => {
    const response = await apiClient.delete(`/forms/admin/${id}`);
    return response.data;
  },

  // Bulk delete form submissions
  bulkDeleteSubmissions: async (ids) => {
    const response = await apiClient.post('/forms/admin/bulk-delete', { ids });
    return response.data;
  },
};

