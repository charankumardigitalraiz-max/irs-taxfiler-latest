import { apiClient } from './authService';

// Service for client-side document management
export const documentService = {
  // Get current user's documents
  getMyDocuments: async () => {
    const response = await apiClient.get('/client/documents');
    return response.data;
  },

  // Upload document (file + metadata)
  uploadDocument: async ({ documentType, file }) => {
    const formData = new FormData();
    formData.append('documentType', documentType);
    formData.append('file', file);

    const response = await apiClient.post('/client/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};


