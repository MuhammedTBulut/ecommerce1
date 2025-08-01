import { apiClient } from './client';
import type { 
  CartItem, 
  AddToCartRequest 
} from '@/types';

export const cartApi = {
  async getCart(): Promise<CartItem[]> {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  async addToCart(item: AddToCartRequest): Promise<void> {
    await apiClient.post('/cart', item);
  },

  async updateQuantity(itemId: number, quantity: number): Promise<void> {
    await apiClient.put(`/cart/${itemId}`, quantity, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  async removeItem(itemId: number): Promise<void> {
    await apiClient.delete(`/cart/${itemId}`);
  },

  async clearCart(): Promise<void> {
    await apiClient.delete('/cart/clear');
  },
};