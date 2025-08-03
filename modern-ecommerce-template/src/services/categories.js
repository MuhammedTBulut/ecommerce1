import api from './api';

export const categoryService = {
  async getCategories() {
    const response = await api.get('/Categories');
    return response.data;
  },

  async createCategory(categoryData) {
    const response = await api.post('/Categories', categoryData);
    return response.data;
  },

  async updateCategory(id, categoryData) {
    const response = await api.put(`/Categories/${id}`, categoryData);
    return response.data;
  },

  async deleteCategory(id) {
    await api.delete(`/Categories/${id}`);
  }
};

export default categoryService;