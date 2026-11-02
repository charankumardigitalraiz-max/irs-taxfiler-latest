import apiClient from '../api/client';

// Service for admin document management
export const documentService = {
  // List documents with optional filters (by user, status, search)
  getDocuments: async (params = {}) => {
    const response = await apiClient.get('/admin/documents', { params });
    return response.data;
  },

  // Get documents for a specific user
  getDocumentsByUser: async (userId) => {
    const response = await apiClient.get(`/admin/documents/user/${userId}`);
    return response.data;
  },

  // Create document metadata (no binary upload here, just name/size/type)
  createDocument: async ({ userId, documentType, file }) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('documentType', documentType);
    formData.append('file', file);

    const response = await apiClient.post('/admin/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Update document status (approve/reject)
  updateStatus: async (id, status, rejectionReason) => {
    const response = await apiClient.patch(`/admin/documents/${id}/status`, {
      status,
      rejectionReason,
    });
    return response.data;
  },

  // Delete document
  deleteDocument: async (id) => {
    const response = await apiClient.delete(`/admin/documents/${id}`);
    return response.data;
  },
};


