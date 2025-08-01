import { apiClient } from './client';
import type { 
  ProductListItem, 
  Product, 
  ProductCreateRequest,
  ProductFilters 
} from '@/types';

export const productsApi = {
  async getProducts(filters?: ProductFilters): Promise<ProductListItem[]> {
    const params = new URLSearchParams();
    if (filters?.categoryId) params.append('categoryId', filters.categoryId.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    
    const response = await apiClient.get(`/products?${params.toString()}`);
    return response.data;
  },

  async getProduct(id: number): Promise<Product> {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  async createProduct(product: ProductCreateRequest): Promise<number> {
    const response = await apiClient.post('/products', product);
    return response.data;
  },

  async updateProduct(id: number, product: Partial<ProductCreateRequest>): Promise<void> {
    await apiClient.put(`/products/${id}`, product);
  },

  async deleteProduct(id: number): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },
};