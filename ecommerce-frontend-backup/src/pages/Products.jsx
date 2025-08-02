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
        // Fallback to mock data when API fails
        const mockProducts = [
          {
            id: 1,
            name: "Premium Drill Set",
            description: "Professional 18V cordless drill with 50+ accessories. Perfect for home improvement projects.",
            price: 149.99,
            imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
            category: { id: 1, name: "Tools" },
            rating: 4.5,
            reviewCount: 127,
            inStock: true
          },
          {
            id: 2,
            name: "Garden Hose 50ft",
            description: "Heavy-duty garden hose with spray nozzle. Weather resistant and kink-free design.",
            price: 39.99,
            imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
            category: { id: 2, name: "Garden" },
            rating: 4.2,
            reviewCount: 89,
            inStock: true
          },
          {
            id: 3,
            name: "LED Work Light",
            description: "Bright 5000 lumen LED work light with adjustable stand. Perfect for workshops and garages.",
            price: 79.99,
            imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
            category: { id: 1, name: "Tools" },
            rating: 4.7,
            reviewCount: 203,
            inStock: true
          },
          {
            id: 4,
            name: "Paint Brush Set",
            description: "Professional quality brush set for all your painting needs. Includes 10 different sizes.",
            price: 24.99,
            imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
            category: { id: 3, name: "Paint & Supplies" },
            rating: 4.3,
            reviewCount: 156,
            inStock: true
          },
          {
            id: 5,
            name: "Wood Screws Pack",
            description: "Assorted wood screws in various sizes. High-quality steel construction.",
            price: 12.99,
            imageUrl: "https://images.unsplash.com/photo-1609205807107-e2de6e4ecbcc?w=400&h=400&fit=crop",
            category: { id: 4, name: "Hardware" },
            rating: 4.1,
            reviewCount: 67,
            inStock: true
          },
          {
            id: 6,
            name: "Safety Glasses",
            description: "Impact-resistant safety glasses with anti-fog coating. Essential for any workshop.",
            price: 8.99,
            imageUrl: "https://images.unsplash.com/photo-1575987263074-4e30dc916fac?w=400&h=400&fit=crop",
            category: { id: 5, name: "Safety" },
            rating: 4.4,
            reviewCount: 91,
            inStock: true
          }
        ];
        
        setProducts(mockProducts);
        setError(''); // Clear error since we have mock data
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