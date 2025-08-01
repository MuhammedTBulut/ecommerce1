'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartApi } from '@/lib/api/cart';
import { useAuth } from '@/lib/auth/context';
import type { CartItem, AddToCartRequest } from '@/types';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  isLoading: boolean;
  addToCart: (item: AddToCartRequest) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Calculate derived state
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => total + (item.productPrice * item.quantity), 0);

  // Load cart when component mounts or when user authentication changes
  useEffect(() => {
    const loadCartData = async () => {
      if (isAuthenticated) {
        await loadCart();
      } else {
        setItems([]);
      }
    };
    
    loadCartData();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      const cartItems = await cartApi.getCart();
      setItems(cartItems || []);
    } catch (error) {
      console.error('Error loading cart:', error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (item: AddToCartRequest) => {
    if (!isAuthenticated) return;
    
    try {
      await cartApi.addToCart(item);
      await loadCart(); // Reload cart to get updated state
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (!isAuthenticated) return;
    
    try {
      await cartApi.updateQuantity(itemId, quantity);
      await loadCart(); // Reload cart to get updated state
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  const removeItem = async (itemId: number) => {
    if (!isAuthenticated) return;
    
    try {
      await cartApi.removeItem(itemId);
      await loadCart(); // Reload cart to get updated state
    } catch (error) {
      console.error('Error removing item:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      await cartApi.clearCart();
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const value: CartContextType = {
    items,
    itemCount,
    totalAmount,
    isLoading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    loadCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}