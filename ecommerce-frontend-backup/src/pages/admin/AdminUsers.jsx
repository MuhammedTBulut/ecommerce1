import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const pageSize = 10;

  const loadUsers = async (page = currentPage, searchTerm = search) => {
    try {
      setLoading(true);
      setError('');
      const data = await adminService.getUsers(page, pageSize, searchTerm);
      setUsers(data.users);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Kullanıcılar yüklenirken hata oluştu.');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setCurrentPage(1);
    loadUsers(1, searchInput);
  };

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`${userName} kullanıcısını silmek istediğinizden emin misiniz?`)) {
      try {
        await adminService.deleteUser(userId);
        loadUsers(); // Reload the current page
      } catch (err) {
        setError('Kullanıcı silinirken hata oluştu.');
        console.error('Error deleting user:', err);
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadUsers(page);
  };

  const getGenderDisplay = (gender) => {
    if (gender === true) return 'Male';
    if (gender === false) return 'Female';
    return 'Other';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading && users.length === 0) {
    return <LoadingSpinner message="Kullanıcılar yükleniyor..." />;
  }

  return (
    <div className="admin-users">
      <div className="container">
        <div className="page-header">
          <h1>User Management</h1>
          <Link to="/admin/users/create" className="btn btn-primary">
            Add New User
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="admin-content">
          {/* Search */}
          <div className="search-section">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="btn btn-secondary">
                Search
              </button>
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setSearchInput('');
                    setCurrentPage(1);
                    loadUsers(1, '');
                  }}
                  className="btn btn-outline"
                >
                  Clear
                </button>
              )}
            </form>
          </div>

          {/* Users Table */}
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Gender</th>
                  <th>Birth Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge role-${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{getGenderDisplay(user.gender)}</td>
                    <td>{formatDate(user.birthDate)}</td>
                    <td>
                      <div className="action-buttons">
                        <Link 
                          to={`/admin/users/edit/${user.id}`}
                          className="btn btn-sm btn-secondary"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(user.id, user.fullName)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && !loading && (
              <div className="no-data">
                {search ? 'No users found matching your search.' : 'No users found.'}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-outline"
              >
                Previous
              </button>
              
              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`btn ${page === currentPage ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-outline"
              >
                Next
              </button>
            </div>
          )}

          <div className="table-info">
            Showing {users.length} of {users.length} users
            {search && ` (filtered by "${search}")`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;