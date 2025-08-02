import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency, getImageUrl } from '../../utils/helpers';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product.id);
      // Could add toast notification here
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Could add error toast here
    }
  };

  // Create a simple image placeholder
  const placeholderImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8f9fa"/>
      <rect x="20" y="20" width="260" height="260" fill="#e9ecef" rx="8"/>
      <text x="150" y="140" text-anchor="middle" font-family="Arial" font-size="14" fill="#6c757d">
        ${product.name}
      </text>
      <text x="150" y="160" text-anchor="middle" font-family="Arial" font-size="12" fill="#adb5bd">
        Product Image
      </text>
    </svg>
  `)}`;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    
    return stars;
  };

  return (
    <div className="product-card glass-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image">
          <img 
            src={placeholderImage}
            alt={product.name}
            loading="lazy"
          />
          {product.inStock ? (
            <div className="stock-badge in-stock">In Stock</div>
          ) : (
            <div className="stock-badge out-of-stock">Out of Stock</div>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          {product.category && (
            <p className="product-category">{product.category.name}</p>
          )}
          
          {product.rating && (
            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              {product.reviewCount && (
                <span className="review-count">({product.reviewCount})</span>
              )}
            </div>
          )}
          
          <div className="product-price">
            <span className="current-price">{formatCurrency(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="original-price">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
          
          {product.description && (
            <p className="product-description">{product.description}</p>
          )}
        </div>
      </Link>
      
      <div className="product-actions">
        <button 
          onClick={handleAddToCart}
          className="add-to-cart-btn btn btn-gradient"
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;