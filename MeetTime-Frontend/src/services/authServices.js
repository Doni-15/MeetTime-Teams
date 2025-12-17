import API from '../config/api';

const AUTH_API_BASE = '/auth/';

export const authService = {
    login: async (credentials) => {
        const response = await API.post(`${AUTH_API_BASE}login`, credentials);
        return response.data;
    },

    register: async (data) => {
        const response = await API.post(`${AUTH_API_BASE}register`, data);
        return response.data;
    },

    logout: async () => {
        const response = await API.post(`${AUTH_API_BASE}logout`);
        return response.data;
    }
};