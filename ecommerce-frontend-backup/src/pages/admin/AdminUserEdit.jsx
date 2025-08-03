import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../../services';
import { useForm } from '../../hooks';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { isValidPassword } from '../../utils/helpers';

const AdminUserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState(null);

  const validationRules = {
    fullName: {
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
    password: {
      custom: (value) => {
        // Password is optional for edit, but if provided, validate it
        if (value && !isValidPassword(value)) {
          return 'Password must be at least 6 characters with uppercase, lowercase, and number';
        }
        return '';
      },
    },
    confirmPassword: {
      custom: (value) => {
        if (values.password && value !== values.password) {
          return 'Passwords do not match';
        }
        return '';
      },
    },
    roleId: {
      required: true,
    },
    birthDate: {
      required: true,
    },
    gender: {
      required: true,
    },
  };

  const { values, errors, touched, handleChange, handleBlur, validateAll } = useForm(
    {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      roleId: '',
      birthDate: '',
      gender: null,
    },
    validationRules
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setInitialLoading(true);
        const [userData, rolesData] = await Promise.all([
          adminService.getUser(id),
          adminService.getRoles()
        ]);
        
        setUser(userData);
        setRoles(rolesData);
        
        // Populate form with user data
        handleChange('fullName', userData.fullName);
        handleChange('email', userData.email);
        handleChange('roleId', userData.roleId.toString());
        handleChange('gender', userData.gender);
        
        // Format date for input
        if (userData.birthDate) {
          const date = new Date(userData.birthDate);
          const formattedDate = date.toISOString().split('T')[0];
          handleChange('birthDate', formattedDate);
        }
        
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error loading data:', err);
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id, handleChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateAll()) {
      return;
    }

    try {
      setLoading(true);
      const userData = { ...values };
      
      // Convert roleId to number
      userData.roleId = parseInt(userData.roleId);
      
      // Remove password if empty (optional field for update)
      if (!userData.password) {
        delete userData.password;
      }
      // Remove confirmPassword since it's not needed for API
      delete userData.confirmPassword;
      
      await adminService.updateUser(id, userData);
      setSuccess('User updated successfully!');
      setTimeout(() => {
        navigate('/admin/users');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/users');
  };

  if (initialLoading) {
    return <LoadingSpinner message="Loading user data..." />;
  }

  if (!user) {
    return (
      <div className="container">
        <div className="error-message">User not found</div>
      </div>
    );
  }

  return (
    <div className="admin-user-edit">
      <div className="container">
        <div className="page-header">
          <h1>Edit User: {user.fullName}</h1>
        </div>

        <div className="admin-content">
          <div className="form-card">
            <form onSubmit={handleSubmit} className="admin-form">
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={values.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                  className={errors.fullName && touched.fullName ? 'input-error' : ''}
                  placeholder="Enter full name"
                  required
                />
                {errors.fullName && touched.fullName && (
                  <span className="field-error">{errors.fullName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={errors.email && touched.email ? 'input-error' : ''}
                  placeholder="Enter email address"
                  required
                />
                {errors.email && touched.email && (
                  <span className="field-error">{errors.email}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">New Password (optional)</label>
                  <input
                    type="password"
                    id="password"
                    value={values.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    className={errors.password && touched.password ? 'input-error' : ''}
                    placeholder="Leave empty to keep current password"
                  />
                  {errors.password && touched.password && (
                    <span className="field-error">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    onBlur={() => handleBlur('confirmPassword')}
                    className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
                    placeholder="Confirm new password"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <span className="field-error">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="roleId">Role</label>
                <select
                  id="roleId"
                  value={values.roleId}
                  onChange={(e) => handleChange('roleId', e.target.value)}
                  onBlur={() => handleBlur('roleId')}
                  className={errors.roleId && touched.roleId ? 'input-error' : ''}
                  required
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {errors.roleId && touched.roleId && (
                  <span className="field-error">{errors.roleId}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="birthDate">Birth Date</label>
                  <input
                    type="date"
                    id="birthDate"
                    value={values.birthDate}
                    onChange={(e) => handleChange('birthDate', e.target.value)}
                    onBlur={() => handleBlur('birthDate')}
                    className={errors.birthDate && touched.birthDate ? 'input-error' : ''}
                    required
                  />
                  {errors.birthDate && touched.birthDate && (
                    <span className="field-error">{errors.birthDate}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    value={values.gender === null ? '' : values.gender.toString()}
                    onChange={(e) => {
                      const value = e.target.value;
                      const genderValue = value === '' ? null : value === 'true';
                      handleChange('gender', genderValue);
                    }}
                    onBlur={() => handleBlur('gender')}
                    className={errors.gender && touched.gender ? 'input-error' : ''}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                    <option value="">Other</option>
                  </select>
                  {errors.gender && touched.gender && (
                    <span className="field-error">{errors.gender}</span>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-outline"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserEdit;