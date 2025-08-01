import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="page-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.fullName}</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">📦</div>
            <h3>Products</h3>
            <p>Manage your product catalog</p>
            <Link to="/admin/products" className="btn btn-primary">
              Manage Products
            </Link>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📁</div>
            <h3>Categories</h3>
            <p>Organize products into categories</p>
            <Link to="/admin/categories" className="btn btn-primary">
              Manage Categories
            </Link>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📋</div>
            <h3>Orders</h3>
            <p>Track and manage customer orders</p>
            <Link to="/admin/orders" className="btn btn-primary">
              Manage Orders
            </Link>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">👥</div>
            <h3>Users</h3>
            <p>Manage user accounts and roles</p>
            <Link to="/admin/users" className="btn btn-primary">
              Manage Users
            </Link>
          </div>
        </div>

        <div className="dashboard-stats">
          <h2>Quick Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Products</h4>
              <div className="stat-number">---</div>
            </div>
            <div className="stat-card">
              <h4>Total Orders</h4>
              <div className="stat-number">---</div>
            </div>
            <div className="stat-card">
              <h4>Total Users</h4>
              <div className="stat-number">---</div>
            </div>
            <div className="stat-card">
              <h4>Revenue</h4>
              <div className="stat-number">---</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;