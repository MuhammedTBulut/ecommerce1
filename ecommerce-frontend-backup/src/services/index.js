import api from './api';

export const authService = {
  async login(credentials) {
    const response = await api.post('/Auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
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
};

export const productService = {
  async getProducts(params = {}) {
    const response = await api.get('/products', { params });
    return response.data;
  },

  async getProduct(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async createProduct(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  },

  async updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export const categoryService = {
  async getCategories() {
    const response = await api.get('/categories');
    return response.data;
  },

  async createCategory(categoryData) {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },

  async updateCategory(id, categoryData) {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

export const cartService = {
  async getCart() {
    const response = await api.get('/cart');
    return response.data;
  },

  async addToCart(productId, quantity = 1) {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  },

  async updateCartItem(productId, quantity) {
    const response = await api.put('/cart', { productId, quantity });
    return response.data;
  },

  async removeFromCart(productId) {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
  },

  async clearCart() {
    const response = await api.delete('/cart');
    return response.data;
  },
};

export const orderService = {
  async getOrders() {
    const response = await api.get('/orders');
    return response.data;
  },

  async getOrder(id) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async createOrder(orderData) {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
};

export const userService = {
  async getProfile() {
    const response = await api.get('/users/me');
    return response.data;
  },

  async updateProfile(userData) {
    const response = await api.put('/users/me', userData);
    return response.data;
  },

  async deleteAccount() {
    const response = await api.delete('/users/me');
    return response.data;
  },
};

export const supportService = {
  async getTickets() {
    const response = await api.get('/supporttickets');
    return response.data;
  },

  async createTicket(ticketData) {
    const response = await api.post('/supporttickets', ticketData);
    return response.data;
  },
};

export const adminService = {
  async getUsers(page = 1, pageSize = 10, search = '') {
    const params = { page, pageSize };
    if (search) params.search = search;
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  async getUser(id) {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  async createUser(userData) {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  async updateUser(id, userData) {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id) {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  async getRoles() {
    const response = await api.get('/admin/users/roles');
    return response.data;
  },

  async getOrders() {
    const response = await api.get('/admin/orders');
    return response.data;
  },
};