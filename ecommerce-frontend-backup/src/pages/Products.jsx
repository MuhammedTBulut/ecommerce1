import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService, categoryService } from '../services';
import { useApi, useDebounce } from '../hooks';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [categoryId, setCategoryId] = useState(searchParams.get('categoryId') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Load categories
  const { data: categories } = useApi(() => categoryService.getCategories(), []);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError('');
        
        const params = {};
        if (debouncedSearchTerm) params.search = debouncedSearchTerm;
        if (categoryId) params.categoryId = categoryId;
        if (minPrice) params.minPrice = parseFloat(minPrice);
        if (maxPrice) params.maxPrice = parseFloat(maxPrice);

        const data = await productService.getProducts(params);
        setProducts(data);

        // Update URL params
        const newSearchParams = new URLSearchParams();
        if (debouncedSearchTerm) newSearchParams.set('search', debouncedSearchTerm);
        if (categoryId) newSearchParams.set('categoryId', categoryId);
        if (minPrice) newSearchParams.set('minPrice', minPrice);
        if (maxPrice) newSearchParams.set('maxPrice', maxPrice);
        setSearchParams(newSearchParams);

      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [debouncedSearchTerm, categoryId, minPrice, maxPrice, setSearchParams]);

  const handleFilterChange = (filters) => {
    setSearchTerm(filters.search || '');
    setCategoryId(filters.categoryId || '');
    setMinPrice(filters.minPrice || '');
    setMaxPrice(filters.maxPrice || '');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryId('');
    setMinPrice('');
    setMaxPrice('');
  };

  if (loading && products.length === 0) {
    return <LoadingSpinner message="Loading products..." />;
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Products</h1>
          <p>Discover our wide range of quality products</p>
        </div>

        <div className="products-content">
          {/* Sidebar with filters */}
          <aside className="products-sidebar">
            <ProductFilters
              categories={categories || []}
              filters={{
                search: searchTerm,
                categoryId,
                minPrice,
                maxPrice,
              }}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Main content */}
          <div className="products-main">
            {error && (
              <div className="error-message">
                {error}
                <button onClick={() => window.location.reload()}>Try Again</button>
              </div>
            )}

            {loading && (
              <div className="loading-overlay">
                <LoadingSpinner size="small" message="Updating results..." />
              </div>
            )}

            <div className="products-header">
              <h2>
                {products.length} Product{products.length !== 1 ? 's' : ''} Found
              </h2>
              {(searchTerm || categoryId || minPrice || maxPrice) && (
                <button onClick={clearFilters} className="clear-filters-btn">
                  Clear All Filters
                </button>
              )}
            </div>

            {products.length === 0 && !loading ? (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your search criteria or browse all products.</p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Show All Products
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;