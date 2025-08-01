import React, { useState } from 'react';

const ProductFilters = ({ categories, filters, onFilterChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      search: '',
      categoryId: '',
      minPrice: '',
      maxPrice: '',
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <div className="product-filters">
      <div className="filters-header">
        <h3>Filters</h3>
        <button onClick={handleClear} className="clear-filters">
          Clear All
        </button>
      </div>

      {/* Search */}
      <div className="filter-group">
        <label htmlFor="search">Search Products</label>
        <input
          type="text"
          id="search"
          value={localFilters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          placeholder="Search by name..."
          className="filter-input"
        />
      </div>

      {/* Category */}
      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={localFilters.categoryId}
          onChange={(e) => handleChange('categoryId', e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <label>Price Range</label>
        <div className="price-inputs">
          <input
            type="number"
            value={localFilters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            placeholder="Min Price"
            className="filter-input price-input"
            min="0"
            step="0.01"
          />
          <span className="price-separator">to</span>
          <input
            type="number"
            value={localFilters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            placeholder="Max Price"
            className="filter-input price-input"
            min="0"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;