import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '../services/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/Loading';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart, isLoading: cartLoading } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productService.getProduct(parseInt(id));
      setProduct(data);
    } catch (error) {
      if (error.response?.status === 404) {
        setError('Product not found');
      } else {
        setError('Failed to load product. Please try again.');
      }
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(product.id, quantity);
      
      // Show success message (you could use a toast here)
      alert('Product added to cart successfully!');
    } catch (error) {
      alert('Failed to add product to cart. Please try again.');
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-primary-600 transition-colors"
            >
              Home
            </button>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <button
                onClick={() => navigate('/products')}
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                Products
              </button>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-500 truncate">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-96 lg:h-full object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-96 lg:h-full bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
              <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <p className="text-sm font-medium text-primary-600 mb-2">
              {product.categoryName}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Stock Status */}
          <div>
            {isOutOfStock ? (
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Out of Stock
                </span>
              </div>
            ) : isLowStock ? (
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Only {product.stock} left
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  In Stock ({product.stock} available)
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          {!isOutOfStock && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <span className="px-4 py-2 border border-gray-300 rounded-md text-center min-w-[60px]">
                    {quantity}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  loading={addingToCart || cartLoading}
                  disabled={addingToCart || cartLoading}
                  className="flex-1"
                  size="lg"
                >
                  {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                </Button>
                
                {!isAuthenticated && (
                  <Button
                    variant="outline"
                    onClick={() => navigate('/login')}
                    className="flex-1"
                    size="lg"
                  >
                    Login to Purchase
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Product Features */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Free shipping on orders over $50</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">30-day return policy</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Secure payment processing</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">24/7 customer support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;