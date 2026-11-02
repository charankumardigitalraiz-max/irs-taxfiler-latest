import apiClient from '../client';

export const documentsApi = {
  // Get all documents
  getAll: async (params = {}) => {
    const response = await apiClient.get('/admin/documents', { params });
    return response.data;
  },

  // Get documents for a specific user
  getByUser: async (userId) => {
    const response = await apiClient.get(`/admin/users/${userId}/documents`);
    return response.data;
  },

  // Upload document for a user
  upload: async (userId, file, documentType) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    const response = await apiClient.post(
      `/admin/users/${userId}/documents`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Update document status (approve/reject)
  updateStatus: async (id, status, rejectionReason = '') => {
    const response = await apiClient.patch(`/admin/documents/${id}/status`, {
      status,
      rejectionReason,
    });
    return response.data;
  },

  // Download document
  download: async (id) => {
    const response = await apiClient.get(`/admin/documents/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Delete document
  delete: async (id) => {
    const response = await apiClient.delete(`/admin/documents/${id}`);
    return response.data;
  },
};

export default documentsApi;

