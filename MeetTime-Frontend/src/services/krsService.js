import api from "@/config/api";

const KRS_API_BASE = '/krs/';

export const krsService = {
    getAll: async () => {
        const response = await api.get(`${KRS_API_BASE}all-krs`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post(`${KRS_API_BASE}new-krs`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`${KRS_API_BASE}delete-krs/${id}`);
        return response.data;
    }
};