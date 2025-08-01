// API Response Types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

// Auth Types
export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  gender: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Product Types
export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  categoryName: string;
  imageUrl: string;
}

export interface ProductListItem {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  categoryName: string;
  imageUrl: string;
}

export interface ProductCreateRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  imageUrl: string;
}

// Cart Types
export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  quantity: number;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

// Order Types
export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface OrderCreateRequest {
  items: OrderItem[];
}

export interface OrderListItem {
  id: number;
  createdAt: string;
  totalAmount: number;
}

export interface OrderProduct {
  name: string;
  price: number;
  quantity: number;
}

export interface OrderDetail {
  id: number;
  createdAt: string;
  items: OrderProduct[];
  totalAmount: number;
}

// Support Types
export interface SupportTicket {
  id: number;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicketCreateRequest {
  subject: string;
  message: string;
}

// Filter Types
export interface ProductFilters {
  categoryId?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}