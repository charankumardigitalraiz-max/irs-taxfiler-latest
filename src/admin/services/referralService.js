import apiClient from '../api/client';

export const referralService = {
  // Get all referrals for admin dashboard
  getReferrals: async (params = {}) => {
    const response = await apiClient.get('/admin/referrals', { params });
    return response.data;
  },
};


