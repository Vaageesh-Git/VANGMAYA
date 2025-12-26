// app/components/ProductListing/ProductListing.jsx
'use client';

import { useState, useMemo } from 'react';
import ProductFilters from './ProductFilters';
import ProductCard from './ProductCard';

const PRODUCTS_PER_PAGE = 12;

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest First' },
  { value: 'discount', label: 'Discount' },
];

export default function ProductListing({ products, filters, categoryName }) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilters, setActiveFilters] = useState({
    subcategories: [],
    brands: [],
    priceRange: null,
    rating: null,
    discount: null,
    inStockOnly: false,
  });

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply subcategory filter
    if (activeFilters.subcategories.length > 0) {
      result = result.filter(p => 
        activeFilters.subcategories.includes(p.subcategory)
      );
    }

    // Apply brand filter
    if (activeFilters.brands.length > 0) {
      result = result.filter(p => activeFilters.brands.includes(p.brand));
    }

    // Apply price range filter
    if (activeFilters.priceRange) {
      result = result.filter(p => 
        p.price >= activeFilters.priceRange.min && 
        p.price <= activeFilters.priceRange.max
      );
    }

    // Apply rating filter
    if (activeFilters.rating) {
      result = result.filter(p => p.rating >= activeFilters.rating);
    }

    // Apply discount filter
    if (activeFilters.discount) {
      result = result.filter(p => p.discount >= activeFilters.discount);
    }

    // Apply in stock filter
    if (activeFilters.inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [products, activeFilters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleFilterChange = (type, value) => {
    setCurrentPage(1);

    setActiveFilters(prev => {
      if (type === 'subcategories' || type === 'brands') {
        const current = prev[type];
        const updated = current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value];
        return { ...prev, [type]: updated };
      }
      
      if (type === 'priceRange' || type === 'rating' || type === 'discount') {
        return { ...prev, [type]: prev[type] === value ? null : value };
      }
      
      return { ...prev, [type]: value };
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({
      subcategories: [],
      brands: [],
      priceRange: null,
      rating: null,
      discount: null,
      inStockOnly: false,
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Count active filters
  const activeFilterCount = 
    activeFilters.subcategories.length +
    activeFilters.brands.length +
    (activeFilters.priceRange ? 1 : 0) +
    (activeFilters.rating ? 1 : 0) +
    (activeFilters.discount ? 1 : 0) +
    (activeFilters.inStockOnly ? 1 : 0);

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <section className="product-listing">
      <div className="container">
        {/* Toolbar */}
        <div className="product-listing__toolbar">
          <div className="product-listing__info">
            <p className="product-listing__results">
              Showing <strong>{paginatedProducts.length}</strong> of{' '}
              <strong>{filteredProducts.length}</strong> products
            </p>
          </div>

          <div className="product-listing__controls">
            {/* Mobile Filter Button */}
            <button 
              className="product-listing__filter-btn"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="product-listing__filter-count">{activeFilterCount}</span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="product-listing__sort">
              <label htmlFor="sort-select" className="product-listing__sort-label">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="product-listing__sort-select"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="product-listing__view-toggle">
              <button
                className={`product-listing__view-btn ${viewMode === 'grid' ? 'product-listing__view-btn--active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
              <button
                className={`product-listing__view-btn ${viewMode === 'list' ? 'product-listing__view-btn--active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Tags */}
        {activeFilterCount > 0 && (
          <div className="product-listing__active-filters">
            {activeFilters.brands.map((brand) => (
              <button
                key={brand}
                className="product-listing__filter-tag"
                onClick={() => handleFilterChange('brands', brand)}
              >
                {brand}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            ))}
            {activeFilters.subcategories.map((sub) => (
              <button
                key={sub}
                className="product-listing__filter-tag"
                onClick={() => handleFilterChange('subcategories', sub)}
              >
                {sub}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            ))}
            {activeFilters.priceRange && (
              <button
                className="product-listing__filter-tag"
                onClick={() => handleFilterChange('priceRange', activeFilters.priceRange)}
              >
                {activeFilters.priceRange.label}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            {activeFilters.rating && (
              <button
                className="product-listing__filter-tag"
                onClick={() => handleFilterChange('rating', activeFilters.rating)}
              >
                {activeFilters.rating}★ & Up
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            {activeFilters.discount && (
              <button
                className="product-listing__filter-tag"
                onClick={() => handleFilterChange('discount', activeFilters.discount)}
              >
                {activeFilters.discount}%+ off
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            {activeFilters.inStockOnly && (
              <button
                className="product-listing__filter-tag"
                onClick={() => handleFilterChange('inStockOnly', false)}
              >
                In Stock
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              className="product-listing__clear-all"
              onClick={handleClearFilters}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="product-listing__content">
          {/* Sidebar Filters */}
          <ProductFilters
            filters={filters}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isMobileOpen={isMobileFiltersOpen}
            onMobileClose={() => setIsMobileFiltersOpen(false)}
          />

          {/* Products Grid */}
          <div className="product-listing__main">
            {filteredProducts.length === 0 ? (
              <div className="product-listing__empty">
                <div className="product-listing__empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M8 11h6" />
                  </svg>
                </div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria</p>
                <button 
                  className="product-listing__empty-btn"
                  onClick={handleClearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`product-listing__grid product-listing__grid--${viewMode}`}>
                  {paginatedProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="product-listing__pagination" aria-label="Pagination">
                    {/* Previous Button */}
                    <button
                      className="product-listing__page-btn product-listing__page-btn--nav"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                      <span>Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="product-listing__page-numbers">
                      {getPaginationNumbers().map((page, index) => (
                        page === '...' ? (
                          <span key={`ellipsis-${index}`} className="product-listing__ellipsis">
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            className={`product-listing__page-btn ${currentPage === page ? 'product-listing__page-btn--active' : ''}`}
                            onClick={() => handlePageChange(page)}
                            aria-label={`Page ${page}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                          >
                            {page}
                          </button>
                        )
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      className="product-listing__page-btn product-listing__page-btn--nav"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                    >
                      <span>Next</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </nav>
                )}

                {/* Page Info */}
                <p className="product-listing__page-info">
                  Page {currentPage} of {totalPages}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
