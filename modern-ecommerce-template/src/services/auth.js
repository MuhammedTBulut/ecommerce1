import api from './api';

export const authService = {
  async login(credentials) {
    const response = await api.post('/Auth/login', credentials);
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/Auth/register', userData);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'Admin';
  }
};

export default authService;