import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services';
import { useAuth } from './AuthContext';

const CartContext = createContext({});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load cart from local storage for non-authenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    }
  }, [isAuthenticated]);

  // Save cart to local storage for non-authenticated users
  const saveToLocalStorage = (cartData) => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  };

  const loadCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      if (isAuthenticated) {
        const updatedCart = await cartService.addToCart(productId, quantity);
        setCart(updatedCart);
      } else {
        // Handle local cart for non-authenticated users
        const existingItem = cart.items.find(item => item.productId === productId);
        let newCart;
        
        if (existingItem) {
          newCart = {
            ...cart,
            items: cart.items.map(item =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        } else {
          newCart = {
            ...cart,
            items: [...cart.items, { productId, quantity }]
          };
        }
        
        setCart(newCart);
        saveToLocalStorage(newCart);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (isAuthenticated) {
        const updatedCart = await cartService.updateCartItem(productId, quantity);
        setCart(updatedCart);
      } else {
        const newCart = {
          ...cart,
          items: cart.items.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          )
        };
        setCart(newCart);
        saveToLocalStorage(newCart);
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (isAuthenticated) {
        const updatedCart = await cartService.removeFromCart(productId);
        setCart(updatedCart);
      } else {
        const newCart = {
          ...cart,
          items: cart.items.filter(item => item.productId !== productId)
        };
        setCart(newCart);
        saveToLocalStorage(newCart);
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await cartService.clearCart();
      } else {
        localStorage.removeItem('cart');
      }
      setCart({ items: [] });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    loadCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};