import api from "@/config/api";

const AGENDA_API_BASE = '/agenda/';

export const agendaService = {
    getAll: async () => {
        const response = await api.get(`${AGENDA_API_BASE}all-agenda`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post(`${AGENDA_API_BASE}new-agenda`, data);
        return response.data;
    },
    
    delete: async (id) => {
        const response = await api.delete(`${AGENDA_API_BASE}delete-agenda/${id}`);
        return response.data;
    }
};