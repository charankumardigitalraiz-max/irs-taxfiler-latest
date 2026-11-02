import { baseUrl } from '../../baseurl';
import { apiClient } from './authService';

export const settingsService = {
  // Get public setting by key (client/web)
  getSetting: async (key) => {
    const response = await apiClient.get(`/settings/${key}`);
    return response.data;
  },
};

// For web pages (no auth required)
export const publicSettingsService = {
  getSetting: async (key) => {
    const baseURLs = baseUrl;
    // const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const response = await fetch(`${baseURLs}/api/settings/${key}`);
    const data = await response.json();
    return data;
  },
};

