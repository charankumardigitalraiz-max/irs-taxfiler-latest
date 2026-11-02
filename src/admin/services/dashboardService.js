import apiClient from '../api/client';

export const dashboardService = {
  // Get admin dashboard statistics
  getDashboardStats: async () => {
    const response = await apiClient.get('/dashboard/admin/stats');
    return response.data;
  },
};

