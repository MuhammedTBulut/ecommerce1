import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useScrollAnimation } from '../hooks/useAnimations';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const featuresRef = useScrollAnimation();
  const statsRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero modern-hero">
        <div className="container-content">
          <div className="hero-content animate-slideInUp">
            <div className="hero-badge">
              <span>✨ Premium Quality Products</span>
            </div>
            <h1 className="hero-title">
              Your Trusted
              <span className="gradient-text"> E-Commerce</span>
              <br />Partner
            </h1>
            <p className="hero-subtitle">
              Experience seamless shopping with our curated collection of premium products. 
              Quality guaranteed, satisfaction delivered.
            </p>
            {isAuthenticated ? (
              <div className="hero-actions">
                <p className="welcome-text">Welcome back, <span className="user-name">{user?.fullName}</span></p>
                <div className="cta-buttons">
                  <Link to="/products" className="btn btn-primary-modern">
                    <span>Explore Products</span>
                    <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <Link to="/orders" className="btn btn-secondary-modern">My Orders</Link>
                </div>
              </div>
            ) : (
              <div className="hero-actions">
                <div className="cta-buttons">
                  <Link to="/register" className="btn btn-primary-modern">
                    <span>Get Started</span>
                    <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <Link to="/products" className="btn btn-secondary-modern">Browse Products</Link>
                </div>
              </div>
            )}
          </div>
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="product-card floating-1">
                <div className="card-icon">📱</div>
                <span>Electronics</span>
              </div>
              <div className="product-card floating-2">
                <div className="card-icon">👕</div>
                <span>Fashion</span>
              </div>
              <div className="product-card floating-3">
                <div className="card-icon">🏠</div>
                <span>Home</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container-content">
          <div className="stats-grid scroll-reveal">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5K+</div>
              <div className="stat-label">Products Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Customer Support</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features modern-features" ref={featuresRef}>
        <div className="container-content">
          <div className="scroll-reveal">
            <div className="section-header">
              <h2>Why Choose Our Platform</h2>
              <p>We deliver excellence through innovative solutions and unmatched service quality</p>
            </div>
            <div className="features-grid">
              <div className="feature-card modern-card">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>Premium Quality</h3>
                <p>Carefully curated products that meet the highest standards of quality and durability.</p>
              </div>
              <div className="feature-card modern-card">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Lightning Fast</h3>
                <p>Swift delivery and responsive customer service to get you what you need, when you need it.</p>
              </div>
              <div className="feature-card modern-card">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Secure & Trusted</h3>
                <p>Bank-level security and privacy protection for all your transactions and personal data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta modern-cta" ref={ctaRef}>
        <div className="container-content">
          <div className="cta-content scroll-reveal">
            <h2>Ready to Transform Your Shopping Experience?</h2>
            <p>Join thousands of satisfied customers who trust us for their daily needs</p>
            <Link to="/products" className="btn btn-primary-modern btn-large">
              <span>Start Shopping Now</span>
              <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;