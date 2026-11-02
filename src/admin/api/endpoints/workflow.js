import apiClient from '../client';

export const workflowApi = {
  // Get workflow stages configuration
  getStages: async () => {
    const response = await apiClient.get('/admin/workflow/stages');
    return response.data;
  },
  
  // Advance user to next workflow stage
  advance: async (userId, targetStatus, notes = '') => {
    const response = await apiClient.post(`/admin/users/${userId}/workflow/advance`, {
      targetStatus,
      notes,
    });
    return response.data;
  },
  
  // Override user workflow status (admin only)
  override: async (userId, targetStatus, reason) => {
    const response = await apiClient.post(`/admin/users/${userId}/workflow/override`, {
      targetStatus,
      reason,
    });
    return response.data;
  },
  
  // Get workflow history for a user
  getHistory: async (userId) => {
    const response = await apiClient.get(`/admin/users/${userId}/timeline`);
    return response.data;
  },
};

export default workflowApi;

