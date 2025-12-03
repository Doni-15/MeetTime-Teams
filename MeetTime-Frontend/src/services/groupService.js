import api from "@/config/api";

const GROUP_API_BASE = '/groups/'; 

export const groupService = {
    getMyGroups: async () => {
        const response = await api.get(GROUP_API_BASE);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post(GROUP_API_BASE, data);
        return response.data;
    },

    join: async (data) => {
        const response = await api.post(`${GROUP_API_BASE}join`, data);
        return response.data;
    },

    getMembers: async (groupId) => {
        const response = await api.get(`${GROUP_API_BASE}${groupId}/members`);
        return response.data;
    },

    kickMember: async (groupId, targetUserId) => {
        const response = await api.delete(`${GROUP_API_BASE}${groupId}/members/${targetUserId}`);
        return response.data;
    },

    addMember: async (groupId, nim) => {
        const response = await api.post(`${GROUP_API_BASE}${groupId}/members`, { nim });
        return response.data;
    },

    searchUser: async (keyword) => {
        const response = await api.get(`${GROUP_API_BASE}cari-member?q=${keyword}`);
        return response.data;
    },

    deleteGroup: async (groupId) => {
        const response = await api.delete(`${GROUP_API_BASE}${groupId}`);
        return response.data;
    },

    getSchedules: async (groupId) => {
        const response = await api.get(`${GROUP_API_BASE}${groupId}/schedules`);
        return response.data;
    }
};