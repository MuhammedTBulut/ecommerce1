import { apiClient } from './client';
import type { 
  OrderCreateRequest, 
  OrderListItem, 
  OrderDetail 
} from '@/types';

export const ordersApi = {
  async createOrder(order: OrderCreateRequest): Promise<number> {
    const response = await apiClient.post('/orders', order);
    return response.data;
  },

  async getMyOrders(): Promise<OrderListItem[]> {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  async getOrderDetail(id: number): Promise<OrderDetail> {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },
};