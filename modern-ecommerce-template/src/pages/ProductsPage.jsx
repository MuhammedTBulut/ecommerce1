import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import productService from '../services/products';
import categoryService from '../services/categories';
import Button from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { LoadingSpinner } from '../components/ui/Loading';

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    categoryId: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'name',
  });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.categoryId) params.categoryId = parseInt(filters.categoryId);
      if (filters.minPrice) params.minPrice = parseFloat(filters.minPrice);
      if (filters.maxPrice) params.maxPrice = parseFloat(filters.maxPrice);
      
      const data = await productService.getProducts(params);
      
      // Sort products client-side
      let sortedProducts = [...data];
      switch (filters.sortBy) {
        case 'price-low':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'name':
        default:
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
      
      setProducts(sortedProducts);
    } catch (error) {
      setError('Failed to load products. Please try again.');
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newSearchParams.set(k, v);
    });
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      categoryId: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
    };
    setFilters(clearedFilters);
    setSearchParams({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value !== 'name');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
        <p className="text-lg text-gray-600">
          Discover our wide range of products
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <Input
              label="Search Products"
              placeholder="Search by name..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <Select
              label="Category"
              value={filters.categoryId}
              onChange={(e) => handleFilterChange('categoryId', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Input
              label="Min Price"
              type="number"
              placeholder="Min"
              min="0"
              step="0.01"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </div>

          <div>
            <Input
              label="Max Price"
              type="number"
              placeholder="Max"
              min="0"
              step="0.01"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        {/* Sort and Clear */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4 gap-4">
          <div className="w-full sm:w-auto">
            <Select
              label="Sort By"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          {/* Results Info */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria or browse all products.
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-w-1 aspect-h-1 bg-gray-200">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.categoryName}</p>
        <p className="text-lg font-bold text-primary-600">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default ProductsPage;