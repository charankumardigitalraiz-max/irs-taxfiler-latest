import apiClient from '../client';

export const auditApi = {
  // Get all audit logs
  getAll: async (params = {}) => {
    const response = await apiClient.get('/admin/audit-logs', { params });
    return response.data;
  },

  // Get audit logs for a specific user
  getByUser: async (userId) => {
    const response = await apiClient.get(`/admin/users/${userId}/audit-logs`);
    return response.data;
  },

  // Get audit logs for a specific entity
  getByEntity: async (entityType, entityId) => {
    const response = await apiClient.get('/admin/audit-logs', {
      params: { entityType, entityId },
    });
    return response.data;
  },
};

export default auditApi;

