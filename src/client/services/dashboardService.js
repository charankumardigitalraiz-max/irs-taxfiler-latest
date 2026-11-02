import { apiClient } from './authService';

export const dashboardService = {
  // Get client dashboard statistics
  getDashboardData: async () => {
    const response = await apiClient.get('/dashboard/client/stats');
    return response.data;
  },

  getFinancialYears: () => {
    return [
      { value: '2024-25', label: '2024-25' },
      { value: '2023-24', label: '2023-24' },
      { value: '2022-23', label: '2022-23' },
      { value: '2021-22', label: '2021-22' },
    ];
  }
};

