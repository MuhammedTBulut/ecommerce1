import { apiClient } from './client';
import type { Category } from '@/types';

export const categoriesApi = {
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  async createCategory(name: string): Promise<number> {
    const response = await apiClient.post('/categories', { name });
    return response.data;
  },

  async updateCategory(id: number, name: string): Promise<void> {
    await apiClient.put(`/categories/${id}`, { name });
  },

  async deleteCategory(id: number): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  },
};