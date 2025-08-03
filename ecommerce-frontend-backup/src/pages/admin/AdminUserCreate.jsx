import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services';
import { useForm } from '../../hooks';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { isValidPassword } from '../../utils/helpers';

const AdminUserCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [roles, setRoles] = useState([]);

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
      required: true,
      custom: (value) => {
        if (!isValidPassword(value)) {
          return 'Password must be at least 6 characters with uppercase, lowercase, and number';
        }
        return '';
      },
    },
    confirmPassword: {
      required: true,
      custom: (value) => {
        if (value !== values.password) {
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
    const loadRoles = async () => {
      try {
        const rolesData = await adminService.getRoles();
        setRoles(rolesData);
      } catch (err) {
        setError('Failed to load roles');
        console.error('Error loading roles:', err);
      }
    };
    loadRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateAll()) {
      return;
    }

    try {
      setLoading(true);
      const userData = values;
      // Convert roleId to number
      userData.roleId = parseInt(userData.roleId);
      
      await adminService.createUser(userData);
      setSuccess('User created successfully!');
      setTimeout(() => {
        navigate('/admin/users');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/users');
  };

  if (loading && !roles.length) {
    return <LoadingSpinner message="Loading form data..." />;
  }

  return (
    <div className="admin-user-create">
      <div className="container">
        <div className="page-header">
          <h1>Create New User</h1>
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
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={values.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    className={errors.password && touched.password ? 'input-error' : ''}
                    placeholder="Create password"
                    required
                  />
                  {errors.password && touched.password && (
                    <span className="field-error">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    onBlur={() => handleBlur('confirmPassword')}
                    className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
                    placeholder="Confirm password"
                    required
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
                  {loading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserCreate;