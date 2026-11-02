import apiClient from '../api/client';

export const supportService = {
  // Get all tickets
  getTickets: async (params = {}) => {
    const response = await apiClient.get('/admin/support', { params });
    return response.data;
  },

  // Admin create ticket on behalf of user
  createTicketOnBehalf: async (ticketData) => {
    const response = await apiClient.post('/admin/support/create', ticketData);
    return response.data;
  },

  // Admin reply to a ticket
  replyToTicket: async (id, message) => {
    const response = await apiClient.post(`/admin/support/${id}/reply`, { message });
    return response.data;
  },

  // Update ticket status
  updateStatus: async (id, status) => {
    const response = await apiClient.patch(`/admin/support/${id}/status`, { status });
    return response.data;
  },

  // Delete support ticket
  deleteTicket: async (id) => {
    const response = await apiClient.delete(`/admin/support/${id}`);
    return response.data;
  },
};


