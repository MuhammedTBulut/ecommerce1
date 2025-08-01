import React from 'react';
import { useApi } from '../hooks';
import { orderService } from '../services';
import { formatCurrency, formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Orders = () => {
  const { data: orders, loading, error } = useApi(() => orderService.getOrders(), []);

  if (loading) {
    return <LoadingSpinner message="Loading orders..." />;
  }

  if (error) {
    return (
      <div className="error-page">
        <h1>Error Loading Orders</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="page-header">
          <h1>My Orders</h1>
          <p>Track and manage your order history</p>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-orders-icon">📦</div>
            <h2>No orders yet</h2>
            <p>When you place your first order, it will appear here.</p>
            <a href="/products" className="btn btn-primary">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">Placed on {formatDate(order.orderDate)}</p>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items?.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="item-details">
                        <span className="item-name">{item.productName}</span>
                        <span className="item-quantity">Qty: {item.quantity}</span>
                      </div>
                      <div className="item-price">
                        {formatCurrency(item.unitPrice)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <strong>Total: {formatCurrency(order.totalAmount)}</strong>
                  </div>
                  <div className="order-actions">
                    <button className="btn btn-secondary">View Details</button>
                    {order.status === 'Processing' && (
                      <button className="btn btn-outline">Cancel Order</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;