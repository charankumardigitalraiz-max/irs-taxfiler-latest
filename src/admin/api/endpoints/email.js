import apiClient from '../client';

export const emailApi = {
  getTemplates: async () => {
    const response = await apiClient.get('/email/templates');
    return response.data;
  },

  getTemplateById: async (id) => {
    const response = await apiClient.get(`/email/templates/${id}`);
    return response.data;
  },

  sendEmail: async (data) => {
    // FormData is handled automatically by the request interceptor in client.js
    const response = await apiClient.post('/email/send', data);
    return response.data;
  },
};

export default emailApi;

