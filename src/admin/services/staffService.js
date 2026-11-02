import apiClient from '../api/client';

const staffService = {
    getStaff: async () => {
        const response = await apiClient.get('/admin/staff');
        return response.data.data; // API returns { success: true, data: [...] }
    },

    createStaff: async (data) => {
        const response = await apiClient.post('/admin/staff', data);
        return response.data;
    },

    updateStaff: async (id, data) => {
        const response = await apiClient.put(`/admin/staff/${id}`, data);
        return response.data;
    },

    deleteStaff: async (id) => {
        const response = await apiClient.delete(`/admin/staff/${id}`);
        return response.data;
    },
};

export default staffService;
