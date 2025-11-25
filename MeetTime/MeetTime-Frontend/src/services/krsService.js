import api from "@/config/api";

export const krsService = {
    getAll: async () => {
        const response = await api.get('/krs/all-krs');
        return response.data;
    },

    create: async (data) => {
        const response = await api.post('/krs/new-krs', data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/krs/delete-krs/${id}`);
        return response.data;
    }
};