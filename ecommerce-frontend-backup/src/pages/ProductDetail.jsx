import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services';
import { useCart } from '../contexts/CartContext';
import { formatCurrency, getImageUrl } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await productService.getProduct(id);
        setProduct(data);
      } catch (err) {
        setError('Product not found');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addToCart(product.id, quantity);
      // Could add success toast here
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Could add error toast here
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading product..." />;
  }

  if (error || !product) {
    return (
      <div className="error-page">
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-content">
          <div className="product-image-section">
            <img 
              src={getImageUrl(product.imageUrl)} 
              alt={product.name}
              className="product-image"
              onError={(e) => {
                e.target.src = '/placeholder-image.png';
              }}
            />
          </div>

          <div className="product-info-section">
            <nav className="breadcrumb">
              <a href="/products">Products</a> / {product.categoryName}
            </nav>

            <h1 className="product-title">{product.name}</h1>
            <p className="product-category">{product.categoryName}</p>

            <div className="product-price">
              {formatCurrency(product.price)}
            </div>

            {product.description && (
              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
            )}

            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="quantity-select"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="add-to-cart-btn btn-primary"
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>

            <div className="product-features">
              <h3>Product Features</h3>
              <ul>
                <li>✓ High Quality</li>
                <li>✓ Fast Shipping</li>
                <li>✓ Money Back Guarantee</li>
                <li>✓ Customer Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;