import api from "@/config/api";

const CHAT_API_BASE = '/chat/';

export const chatService = {
    getChats: async (groupId, jenis = 'pesan') => {
        const response = await api.get(`${CHAT_API_BASE}${groupId}`, {
            params: { jenis }
        });
        return response.data;
    },

    sendChat: async (groupId, data) => {
        const response = await api.post(`${CHAT_API_BASE}${groupId}`, data);
        return response.data;
    }
};