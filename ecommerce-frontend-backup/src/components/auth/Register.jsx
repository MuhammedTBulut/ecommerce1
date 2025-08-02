import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks';
import LoadingSpinner from '../common/LoadingSpinner';
import { isValidPassword } from '../../utils/helpers';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
      birthDate: '',
      gender: '',
    },
    validationRules
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateAll()) {
      return;
    }

    try {
      setIsLoading(true);
      const { confirmPassword: _, ...registerData } = values;
      await register(registerData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Creating your account..." />;
  }

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="success-message">
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully. Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join us today! Create your account to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={values.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              className={errors.fullName && touched.fullName ? 'input-error' : ''}
              placeholder="Enter your full name"
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
              placeholder="Enter your email"
              required
            />
            {errors.email && touched.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={values.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              className={errors.password && touched.password ? 'input-error' : ''}
              placeholder="Create a password"
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
              placeholder="Confirm your password"
              required
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="field-error">{errors.confirmPassword}</span>
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
                value={values.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                onBlur={() => handleBlur('gender')}
                className={errors.gender && touched.gender ? 'input-error' : ''}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && touched.gender && (
                <span className="field-error">{errors.gender}</span>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;