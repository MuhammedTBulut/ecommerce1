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

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image">
          <img 
            src={getImageUrl(product.imageUrl)} 
            alt={product.name}
            onError={(e) => {
              e.target.src = '/placeholder-image.png';
            }}
          />
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.categoryName}</p>
          <div className="product-price">
            {formatCurrency(product.price)}
          </div>
        </div>
      </Link>
      
      <div className="product-actions">
        <button 
          onClick={handleAddToCart}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;