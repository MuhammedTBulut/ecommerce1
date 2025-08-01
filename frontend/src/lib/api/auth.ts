import { apiClient } from './client';
import type { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse 
} from '@/types';

export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<void> {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },
};