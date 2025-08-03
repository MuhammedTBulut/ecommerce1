import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import { LoadingSpinner, LoadingOverlay } from '../components/ui/Loading';

export function CartPage() {
  const { isAuthenticated } = useAuth();
  const { 
    items, 
    total, 
    totalItems, 
    isLoading, 
    error, 
    loadCart, 
    updateQuantity, 
    removeItem, 
    clearCart 
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    loadCart();
  }, [isAuthenticated, navigate, loadCart]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      try {
        await removeItem(itemId);
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      try {
        await clearCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page (to be implemented)
    alert('Checkout functionality will be implemented next!');
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (isLoading && items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
        <p className="text-lg text-gray-600">
          {totalItems === 0 
            ? 'Your cart is empty' 
            : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`
          }
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <LoadingOverlay loading={isLoading}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                    {items.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearCart}
                        disabled={isLoading}
                      >
                        Clear Cart
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </LoadingOverlay>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {total >= 50 ? 'Free' : '$9.99'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${(total + (total >= 50 ? 0 : 9.99) + (total * 0.08)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {total < 50 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    Add ${(50 - total).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              <div className="mt-6 space-y-3">
                <Button
                  onClick={handleCheckout}
                  disabled={isLoading || items.length === 0}
                  className="w-full"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                <Link to="/products" className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CartItem({ item, onQuantityChange, onRemove, disabled }) {
  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Link to={`/products/${item.productId}`}>
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.productName}
              className="w-16 h-16 object-cover rounded-md"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/products/${item.productId}`}
          className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
        >
          {item.productName}
        </Link>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          disabled={disabled || item.quantity <= 1}
          className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="px-2 py-1 text-sm font-medium text-gray-900 min-w-[40px] text-center">
          {item.quantity}
        </span>
        
        <button
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          disabled={disabled}
          className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Price & Remove */}
      <div className="flex items-center space-x-4">
        <div className="text-sm font-medium text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        
        <button
          onClick={() => onRemove(item.id)}
          disabled={disabled}
          className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2 1h12.5M7 13v6a2 2 0 002 2h7a2 2 0 002-2v-6" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
      <p className="text-gray-500 mb-6">
        Start shopping to add items to your cart.
      </p>
      <Link to="/products">
        <Button>
          Start Shopping
        </Button>
      </Link>
    </div>
  );
}

export default CartPage;