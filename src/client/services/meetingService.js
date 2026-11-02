import { apiClient } from './authService';

// Client Free to Call / Schedule service
export const meetingService = {
  // Get current user's meetings
  getMyMeetings: async () => {
    const response = await apiClient.get('/client/meetings');
    return response.data;
  },

  // Request a callback / meeting
  requestCallback: async ({ scheduledAt, notes }) => {
    const response = await apiClient.post('/client/meetings', { scheduledAt, notes });
    return response.data;
  },
};


