import apiClient from '../api/client';

const roleService = {
    getRoles: async () => {
        const response = await apiClient.get('/admin/roles');
        return response.data;
    },

    createRole: async (data) => {
        const response = await apiClient.post('/admin/roles', data);
        return response.data;
    },

    updateRole: async (id, data) => {
        const response = await apiClient.put(`/admin/roles/${id}`, data);
        return response.data;
    },

    deleteRole: async (id) => {
        const response = await apiClient.delete(`/admin/roles/${id}`);
        return response.data;
    },
};

export default roleService;
