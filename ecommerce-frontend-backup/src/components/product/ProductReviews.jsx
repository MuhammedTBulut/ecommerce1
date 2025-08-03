import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { productService } from '../../services';
import './ProductReviews.css';

const ProductReviews = ({ productId }) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    rating: 5
  });

  useEffect(() => {
    loadReviews();
    loadStats();
  }, [productId]);

  const loadReviews = async () => {
    try {
      const data = await productService.getProductComments(productId);
      setComments(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await productService.getProductRatingStats(productId);
      setStats(data);
    } catch (error) {
      console.error('Error loading rating stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    try {
      setSubmitting(true);
      await productService.createProductComment(productId, formData);
      setFormData({ content: '', rating: 5 });
      setShowReviewForm(false);
      loadReviews();
      loadStats();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.response?.data?.message || 'Error submitting review');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className={`stars ${interactive ? 'interactive' : ''}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${rating >= star ? 'filled' : ''}`}
            onClick={interactive ? () => onRatingChange(star) : undefined}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div className="reviews-loading">Loading reviews...</div>;
  }

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <h3>Customer Reviews</h3>
        {stats && stats.totalComments > 0 && (
          <div className="rating-summary">
            <div className="average-rating">
              {renderStars(stats.averageRating)}
              <span className="rating-text">
                {stats.averageRating} out of 5 ({stats.totalComments} review{stats.totalComments !== 1 ? 's' : ''})
              </span>
            </div>
          </div>
        )}
      </div>

      {isAuthenticated && (
        <div className="review-actions">
          {!showReviewForm ? (
            <button
              className="btn-write-review"
              onClick={() => setShowReviewForm(true)}
            >
              Write a Review
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-group">
                <label>Rating:</label>
                {renderStars(formData.rating, true, (rating) => 
                  setFormData({ ...formData, rating })
                )}
              </div>
              <div className="form-group">
                <label htmlFor="review-content">Your Review:</label>
                <textarea
                  id="review-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Share your thoughts about this product..."
                  required
                  rows={4}
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    setShowReviewForm(false);
                    setFormData({ content: '', rating: 5 });
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <div className="reviews-list">
        {comments.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">{comment.userFullName}</span>
                  <span className="review-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {renderStars(comment.rating)}
              </div>
              <p className="review-content">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;