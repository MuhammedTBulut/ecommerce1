import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services';
import { useForm } from '../hooks';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Profile = () => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profile, setProfile] = useState(null);

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
      birthDate: '',
      gender: null,
    },
    validationRules
  );

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const profileData = await userService.getProfile();
        setProfile(profileData);
        
        // Update form values
        Object.keys(profileData).forEach(key => {
          if (Object.prototype.hasOwnProperty.call(values, key)) {
            let value = profileData[key] || '';
            // Handle gender field specifically - convert boolean to display format
            if (key === 'gender') {
              value = profileData[key]; // Keep as boolean/null
            }
            handleChange(key, value);
          }
        });
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [handleChange, values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateAll()) {
      return;
    }

    try {
      setLoading(true);
      await userService.updateProfile(values);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await userService.deleteAccount();
        logout();
      } catch {
        setError('Failed to delete account');
      }
    }
  };

  if (loading && !profile) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="page-header">
          <h1>My Profile</h1>
          <p>Manage your account information</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <form onSubmit={handleSubmit} className="profile-form">
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
                  required
                />
                {errors.email && touched.email && (
                  <span className="field-error">{errors.email}</span>
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
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>

          <div className="danger-zone">
            <h3>Danger Zone</h3>
            <p>Once you delete your account, there is no going back. Please be certain.</p>
            <button 
              onClick={handleDeleteAccount}
              className="btn btn-danger"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;