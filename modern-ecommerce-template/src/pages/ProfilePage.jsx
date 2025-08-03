import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import orderService from '../services/orders';
import userService from '../services/users';
import Button from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { LoadingSpinner, LoadingOverlay } from '../components/ui/Loading';

export function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    birthDate: '',
    gender: '',
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    loadUserData();
  }, [isAuthenticated, navigate]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load user profile and orders
      const [profileResponse, ordersResponse] = await Promise.all([
        userService.getCurrentUser().catch(() => null),
        orderService.getMyOrders().catch(() => [])
      ]);
      
      if (profileResponse) {
        setProfileData({
          fullName: profileResponse.fullName || user?.fullName || '',
          email: profileResponse.email || user?.email || '',
          birthDate: profileResponse.birthDate || '',
          gender: profileResponse.gender || '',
        });
      } else {
        // Fallback to auth context data
        setProfileData({
          fullName: user?.fullName || '',
          email: user?.email || '',
          birthDate: '',
          gender: '',
        });
      }
      
      setOrders(ordersResponse);
    } catch (error) {
      setError('Failed to load profile data.');
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      
      await userService.updateProfile(profileData);
      setSuccess('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Account</h1>
        <p className="text-lg text-gray-600">
          Manage your profile and view your order history
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'orders'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Order History
          </button>
        </nav>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            )}

            <LoadingOverlay loading={saving}>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  required
                />
                
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  required
                  disabled // Usually email shouldn't be editable
                />
                
                <Input
                  label="Birth Date"
                  name="birthDate"
                  type="date"
                  value={profileData.birthDate}
                  onChange={handleInputChange}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="">Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="submit"
                    loading={saving}
                    disabled={saving}
                  >
                    Save Changes
                  </Button>
                  
                  <Button
                    type="button"
                    variant="danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </form>
            </LoadingOverlay>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order History</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-4">
                    You haven't placed any orders yet.
                  </p>
                  <Button onClick={() => navigate('/products')}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderCard({ order }) {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/orders/${order.id}`);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">
            Order #{order.id}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="text-lg font-bold text-primary-600">
            ${order.total.toFixed(2)}
          </p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
            {order.status || 'Pending'}
          </span>
          <br />
          <Button variant="outline" size="sm" onClick={handleViewDetails}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;