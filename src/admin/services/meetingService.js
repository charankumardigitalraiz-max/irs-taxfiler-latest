import apiClient from '../api/client';

// Admin Free to Call / Meetings service
export const meetingService = {
  // List meetings with optional filters
  getMeetings: async (params = {}) => {
    const response = await apiClient.get('/admin/meetings', { params });
    return response.data;
  },

  // Create new meeting
  createMeeting: async (data) => {
    const response = await apiClient.post('/admin/meetings', data);
    return response.data;
  },

  // Update an existing meeting
  updateMeeting: async (id, data) => {
    const response = await apiClient.patch(`/admin/meetings/${id}`, data);
    return response.data;
  },
};


