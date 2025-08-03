import api from './api';

export const productService = {
  async getProducts(params = {}) {
    const response = await api.get('/Products', { params });
    return response.data;
  },

  async getProduct(id) {
    const response = await api.get(`/Products/${id}`);
    return response.data;
  },

  async createProduct(productData) {
    const response = await api.post('/Products', productData);
    return response.data;
  },

  async updateProduct(id, productData) {
    const response = await api.put(`/Products/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id) {
    await api.delete(`/Products/${id}`);
  },

  // Admin endpoints
  async getAdminProducts() {
    const response = await api.get('/admin/products');
    return response.data;
  },

  async createAdminProduct(productData) {
    const response = await api.post('/admin/products', productData);
    return response.data;
  },

  async updateAdminProduct(id, productData) {
    const response = await api.put(`/admin/products/${id}`, productData);
    return response.data;
  },

  async deleteAdminProduct(id) {
    await api.delete(`/admin/products/${id}`);
  }
};

export default productService;