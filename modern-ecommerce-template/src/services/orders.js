import api from './api';

export const orderService = {
  async createOrder(orderData) {
    const response = await api.post('/Orders', orderData);
    return response.data;
  },

  async getMyOrders() {
    const response = await api.get('/Orders');
    return response.data;
  },

  async getOrderDetails(id) {
    const response = await api.get(`/Orders/${id}`);
    return response.data;
  },

  // Admin endpoints
  async getAdminOrders() {
    const response = await api.get('/admin/orders');
    return response.data;
  },

  async updateOrderStatus(id, status) {
    const response = await api.put(`/admin/orders/${id}/status`, { status });
    return response.data;
  }
};

export default orderService;