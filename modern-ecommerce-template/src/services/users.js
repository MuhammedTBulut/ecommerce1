import api from './api';

export const userService = {
  async getCurrentUser() {
    const response = await api.get('/User/me');
    return response.data;
  },

  async updateProfile(userData) {
    const response = await api.put('/User/me', userData);
    return response.data;
  },

  // Admin endpoints
  async getAdminUsers() {
    const response = await api.get('/admin/users');
    return response.data;
  },

  async createAdminUser(userData) {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  async updateAdminUser(id, userData) {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  async deleteAdminUser(id) {
    await api.delete(`/admin/users/${id}`);
  }
};

export default userService;