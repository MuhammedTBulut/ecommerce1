import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const orderStatusNames = {
    0: 'Beklemede',
    1: 'Onaylandı',
    2: 'Kargoda',
    3: 'Teslim Edildi',
    4: 'İptal Edildi'
  };

  const orderStatusColors = {
    0: 'warning',
    1: 'info',
    2: 'primary',
    3: 'success',
    4: 'danger'
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/orders?page=${page}&pageSize=10`);
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
      setError('');
    } catch (err) {
      setError('Siparişler yüklenirken hata oluştu.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetail = async (orderId) => {
    try {
      const response = await api.get(`/admin/orders/${orderId}`);
      setSelectedOrder(response.data);
      setShowOrderDetail(true);
    } catch (err) {
      setError('Sipariş detayları yüklenirken hata oluştu.');
      console.error('Error fetching order detail:', err);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      await fetchOrders(currentPage);
      if (selectedOrder && selectedOrder.id === orderId) {
        await fetchOrderDetail(orderId);
      }
      setError('');
    } catch (err) {
      setError('Sipariş durumu güncellenirken hata oluştu.');
      console.error('Error updating order status:', err);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Bu siparişi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await api.delete(`/admin/orders/${orderId}`);
      await fetchOrders(currentPage);
      if (selectedOrder && selectedOrder.id === orderId) {
        setShowOrderDetail(false);
        setSelectedOrder(null);
      }
      setError('');
    } catch (err) {
      setError('Sipariş silinirken hata oluştu.');
      console.error('Error deleting order:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  if (loading && orders.length === 0) {
    return (
      <div className="admin-orders">
        <div className="container">
          <div className="loading-spinner">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders">
      <div className="container">
        <div className="page-header">
          <h1>Sipariş Yönetimi</h1>
          <button 
            className="btn btn-secondary" 
            onClick={() => fetchOrders(currentPage)}
            disabled={loading}
          >
            {loading ? 'Yenileniyor...' : 'Yenile'}
          </button>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="admin-content">
          {orders.length === 0 ? (
            <div className="text-center">
              <p>Henüz sipariş bulunmamaktadır.</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Sipariş ID</th>
                      <th>Müşteri</th>
                      <th>Tarih</th>
                      <th>Toplam Tutar</th>
                      <th>Durum</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.customerName}</td>
                        <td>{formatDate(order.createdAt)}</td>
                        <td>{formatPrice(order.totalAmount)}</td>
                        <td>
                          <span className={`badge bg-${orderStatusColors[order.status]}`}>
                            {orderStatusNames[order.status]}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => fetchOrderDetail(order.id)}
                            >
                              Detay
                            </button>
                            <div className="dropdown">
                              <button
                                className="btn btn-sm btn-outline-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                              >
                                Durum
                              </button>
                              <ul className="dropdown-menu">
                                {Object.entries(orderStatusNames).map(([value, name]) => (
                                  <li key={value}>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => updateOrderStatus(order.id, parseInt(value))}
                                      disabled={order.status == value}
                                    >
                                      {name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => deleteOrder(order.id)}
                            >
                              Sil
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Önceki
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Sonraki
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>

        {/* Order Detail Modal */}
        {showOrderDetail && selectedOrder && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sipariş Detayları - #{selectedOrder.id}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowOrderDetail(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <strong>Müşteri:</strong> {selectedOrder.customerName}
                    </div>
                    <div className="col-md-6">
                      <strong>Sipariş Tarihi:</strong> {formatDate(selectedOrder.createdAt)}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <strong>Durum:</strong> 
                      <span className={`badge bg-${orderStatusColors[selectedOrder.status]} ms-2`}>
                        {orderStatusNames[selectedOrder.status]}
                      </span>
                    </div>
                    <div className="col-md-6">
                      <strong>Toplam Tutar:</strong> {formatPrice(selectedOrder.totalPrice)}
                    </div>
                  </div>
                  
                  <h6>Sipariş Ürünleri:</h6>
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Ürün</th>
                          <th>Fiyat</th>
                          <th>Adet</th>
                          <th>Toplam</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.products.map((product, index) => (
                          <tr key={index}>
                            <td>{product.name}</td>
                            <td>{formatPrice(product.price)}</td>
                            <td>{product.quantity}</td>
                            <td>{formatPrice(product.price * product.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowOrderDetail(false)}
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;