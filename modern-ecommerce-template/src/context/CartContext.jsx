import React, { createContext, useContext, useReducer, useEffect } from 'react';
import cartService from '../services/cart';
import { useAuth } from './AuthContext';

// Create context
const CartContext = createContext();

// Action types
const CART_ACTIONS = {
  LOAD_START: 'LOAD_START',
  LOAD_SUCCESS: 'LOAD_SUCCESS',
  LOAD_ERROR: 'LOAD_ERROR',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  SET_LOADING: 'SET_LOADING',
};

// Initial state
const initialState = {
  items: [],
  isLoading: false,
  error: null,
  total: 0,
  totalItems: 0,
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.LOAD_START:
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case CART_ACTIONS.LOAD_SUCCESS:
      const items = action.payload;
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        ...state,
        items,
        total,
        totalItems,
        isLoading: false,
        error: null,
      };

    case CART_ACTIONS.LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

// Provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
    }
  }, [isAuthenticated]);

  // Actions
  const loadCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.LOAD_START });
      const items = await cartService.getCart();
      dispatch({ type: CART_ACTIONS.LOAD_SUCCESS, payload: items });
    } catch (error) {
      dispatch({ 
        type: CART_ACTIONS.LOAD_ERROR, 
        payload: error.response?.data?.message || 'Failed to load cart' 
      });
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING });
      await cartService.addToCart(productId, quantity);
      await loadCart(); // Reload cart to get updated data
    } catch (error) {
      dispatch({ 
        type: CART_ACTIONS.LOAD_ERROR, 
        payload: error.response?.data?.message || 'Failed to add item to cart' 
      });
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING });
      await cartService.updateQuantity(itemId, quantity);
      await loadCart();
    } catch (error) {
      dispatch({ 
        type: CART_ACTIONS.LOAD_ERROR, 
        payload: error.response?.data?.message || 'Failed to update quantity' 
      });
      throw error;
    }
  };

  const removeItem = async (itemId) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING });
      await cartService.removeItem(itemId);
      await loadCart();
    } catch (error) {
      dispatch({ 
        type: CART_ACTIONS.LOAD_ERROR, 
        payload: error.response?.data?.message || 'Failed to remove item' 
      });
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING });
      await cartService.clearCart();
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
    } catch (error) {
      dispatch({ 
        type: CART_ACTIONS.LOAD_ERROR, 
        payload: error.response?.data?.message || 'Failed to clear cart' 
      });
      throw error;
    }
  };

  const value = {
    ...state,
    loadCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;