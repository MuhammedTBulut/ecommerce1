import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency, getImageUrl } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Cart = () => {
  const { cart, loading, loadCart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    }
  }, [isAuthenticated, loadCart]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      await updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading cart..." />;
  }

  const cartItems = cart?.items || [];
  const cartTotal = getCartTotal();

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
          {cartItems.length > 0 && (
            <button onClick={handleClearCart} className="clear-cart-btn">
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.productId} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={getImageUrl(item.product?.imageUrl)} 
                      alt={item.product?.name || 'Product'}
                      onError={(e) => {
                        e.target.src = '/placeholder-image.png';
                      }}
                    />
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">
                      <Link to={`/products/${item.productId}`}>
                        {item.product?.name || 'Product'}
                      </Link>
                    </h3>
                    <p className="item-category">{item.product?.categoryName}</p>
                    <div className="item-price">
                      {formatCurrency(item.price || item.product?.price || 0)}
                    </div>
                  </div>

                  <div className="item-quantity">
                    <label htmlFor={`quantity-${item.productId}`}>Qty:</label>
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id={`quantity-${item.productId}`}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 1)}
                        min="1"
                        className="quantity-input"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-subtotal">
                    {formatCurrency((item.price || item.product?.price || 0) * item.quantity)}
                  </div>

                  <div className="item-actions">
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <div className="summary-total">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>

                <div className="checkout-actions">
                  {isAuthenticated ? (
                    <Link to="/checkout" className="btn btn-primary checkout-btn">
                      Proceed to Checkout
                    </Link>
                  ) : (
                    <div className="auth-required">
                      <p>Please sign in to proceed with checkout</p>
                      <Link to="/login" className="btn btn-primary">
                        Sign In
                      </Link>
                    </div>
                  )}
                  
                  <Link to="/products" className="btn btn-secondary">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;