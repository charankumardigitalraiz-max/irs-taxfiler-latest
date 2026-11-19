import apiClient from '../api/client';

export const notificationService = {
  // Get admin notifications
  getNotifications: async (params = {}) => {
    const response = await apiClient.get('/notifications/admin', { params });
    return response.data;
  },

  // Get unread notifications count
  getUnreadCount: async () => {
    const response = await apiClient.get('/notifications/admin/unread-count');
    return response.data;
  },

  // Mark single notification as read
  markAsRead: async (id) => {
    const response = await apiClient.put(`/notifications/admin/${id}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await apiClient.put('/notifications/admin/read-all');
    return response.data;
  },

  // Delete single notification
  deleteNotification: async (id) => {
    const response = await apiClient.delete(`/notifications/admin/${id}`);
    return response.data;
  },

  // Clear all notifications
  clearAll: async () => {
    const response = await apiClient.delete('/notifications/admin/clear-all');
    return response.data;
  },
};

export default notificationService;
