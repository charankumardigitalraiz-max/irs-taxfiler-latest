import { apiClient } from './authService';

export const notificationService = {
  // Get client notifications
  getNotifications: async (params = {}) => {
    const response = await apiClient.get('/notifications/client', { params });
    return response.data;
  },

  // Mark single notification as read
  markAsRead: async (id) => {
    const response = await apiClient.put(`/notifications/client/${id}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await apiClient.put('/notifications/client/read-all');
    return response.data;
  },

  // Delete single notification
  deleteNotification: async (id) => {
    const response = await apiClient.delete(`/notifications/client/${id}`);
    return response.data;
  },

  // Clear all notifications
  clearAll: async () => {
    const response = await apiClient.delete('/notifications/client/clear-all');
    return response.data;
  },
};

export default notificationService;
