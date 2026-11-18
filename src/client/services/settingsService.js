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
    const response = await fetch(`${baseURLs}/api/settings/${key}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data;
  },

  // Dynamically record a website visit on the backend (if endpoint is enabled)
  recordWebsiteVisit: async () => {
    const endpoint =
      import.meta.env.VITE_VISITS_API_URL ||
      `${baseUrl}/api/settings/website-total-views/visit`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`Visit endpoint returned ${response.status}`);
    }
    return response.json();
  },
};

