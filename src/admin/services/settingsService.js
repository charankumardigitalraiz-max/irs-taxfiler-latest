import apiClient from '../api/client';

export const settingsService = {
  // Get all settings (admin)
  getAllSettings: async () => {
    const response = await apiClient.get('/admin/settings');
    return response.data;
  },

  // Get setting by key (admin)
  getSettingByKey: async (key) => {
    const response = await apiClient.get(`/admin/settings/${key}`);
    return response.data;
  },

  // Create or update setting (admin)
  saveSetting: async (settingData) => {
    const response = await apiClient.post('/admin/settings', settingData);
    return response.data;
  },

  // Delete setting (admin)
  deleteSetting: async (id) => {
    const response = await apiClient.delete(`/admin/settings/${id}`);
    return response.data;
  },
};

