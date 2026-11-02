import { apiClient } from './authService';

export const referralService = {
  // Get or create current user's referral info
  getMyReferral: async () => {
    const response = await apiClient.get('/client/referrals');
    return response.data;
  },

  // Create referral invites
  sendInvites: async (payload) => {
    const response = await apiClient.post('/client/referrals/invite', payload);
    return response.data;
  },
};


