import apiClient from '../api/client';

export const auditService = {
    getLogs: async (params = {}) => {
        try {
            const response = await apiClient.get('/admin/audit', { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteLog: async (id) => {
        try {
            const response = await apiClient.delete(`/admin/audit/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    bulkDeleteLogs: async (ids) => {
        try {
            const response = await apiClient.post('/admin/audit/bulk-delete', { ids });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default auditService;
