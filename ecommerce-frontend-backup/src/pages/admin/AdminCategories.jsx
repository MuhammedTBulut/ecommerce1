import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      setCategories(response.data);
      setError('');
    } catch (err) {
      setError('Kategoriler yüklenirken hata oluştu.');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '' });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categories', formData);
      await fetchCategories();
      setShowAddModal(false);
      resetForm();
      setError('');
    } catch (err) {
      setError('Kategori eklenirken hata oluştu.');
      console.error('Error adding category:', err);
    }
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/categories/${editingCategory.id}`, formData);
      await fetchCategories();
      setShowEditModal(false);
      setEditingCategory(null);
      resetForm();
      setError('');
    } catch (err) {
      setError('Kategori güncellenirken hata oluştu.');
      console.error('Error updating category:', err);
    }
  };

  const deleteCategory = async (categoryId) => {
    if (!window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz? Bu kategoriye ait ürünler etkilenebilir.')) {
      return;
    }

    try {
      await api.delete(`/categories/${categoryId}`);
      await fetchCategories();
      setError('');
    } catch (err) {
      setError('Kategori silinirken hata oluştu. Bu kategoriye ait ürünler olabilir.');
      console.error('Error deleting category:', err);
    }
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name });
    setShowEditModal(true);
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  if (loading) {
    return (
      <div className="admin-categories">
        <div className="container">
          <div className="loading-spinner">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-categories">
      <div className="container">
        <div className="page-header">
          <h1>Kategori Yönetimi</h1>
          <button className="btn btn-primary" onClick={openAddModal}>
            Yeni Kategori Ekle
          </button>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="admin-content">
          {categories.length === 0 ? (
            <div className="text-center">
              <p>Henüz kategori bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="row">
              {categories.map((category) => (
                <div key={category.id} className="col-md-6 col-lg-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{category.name}</h5>
                      <p className="card-text text-muted">ID: {category.id}</p>
                      <div className="btn-group w-100" role="group">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => openEditModal(category)}
                        >
                          Düzenle
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => deleteCategory(category.id)}
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Category Modal */}
        {showAddModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Yeni Kategori Ekle</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleAddCategory}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Kategori Adı *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Kategori adını girin"
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowAddModal(false)}
                    >
                      İptal
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Kategori Ekle
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Category Modal */}
        {showEditModal && editingCategory && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Kategori Düzenle - {editingCategory.name}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleEditCategory}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Kategori Adı *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Kategori adını girin"
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowEditModal(false)}
                    >
                      İptal
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Güncelle
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;