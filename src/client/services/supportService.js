import { apiClient } from './authService';

export const supportService = {
  // Create a new ticket for current user
  createTicket: async ({ subject, category, priority, message }) => {
    const response = await apiClient.post('/client/support', {
      subject,
      category,
      priority,
      message,
    });
    return response.data;
  },

  // Get tickets for current user
  getMyTickets: async () => {
    const response = await apiClient.get('/client/support');
    return response.data;
  },

  // Reply to existing ticket
  replyToTicket: async (id, message) => {
    const response = await apiClient.post(`/client/support/${id}/reply`, { message });
    return response.data;
  },
};


