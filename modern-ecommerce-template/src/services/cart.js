import api from './api';

export const cartService = {
  async getCart() {
    const response = await api.get('/Cart');
    return response.data;
  },

  async addToCart(productId, quantity = 1) {
    const response = await api.post('/Cart', { productId, quantity });
    return response.data;
  },

  async updateQuantity(itemId, quantity) {
    const response = await api.put(`/Cart/${itemId}`, quantity, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },

  async removeItem(itemId) {
    await api.delete(`/Cart/${itemId}`);
  },

  async clearCart() {
    await api.delete('/Cart/clear');
  }
};

export default cartService;