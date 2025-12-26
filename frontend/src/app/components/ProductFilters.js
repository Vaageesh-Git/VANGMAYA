// app/components/ProductFilters/ProductFilters.jsx
'use client';

import { useState } from 'react';

export default function ProductFilters({ 
  filters, 
  activeFilters, 
  onFilterChange, 
  onClearFilters,
  isMobileOpen,
  onMobileClose 
}) {
  const [expandedSections, setExpandedSections] = useState({
    subcategories: true,
    brands: true,
    price: true,
    rating: false,
    discount: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (type, value) => {
    onFilterChange(type, value);
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    filter => Array.isArray(filter) ? filter.length > 0 : filter !== null
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="filters__overlay" onClick={onMobileClose} />
      )}

      <aside className={`filters ${isMobileOpen ? 'filters--open' : ''}`}>
        {/* Mobile Header */}
        <div className="filters__mobile-header">
          <h2>Filters</h2>
          <button 
            className="filters__close-btn" 
            onClick={onMobileClose}
            aria-label="Close filters"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button className="filters__clear" onClick={onClearFilters}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z" />
            </svg>
            Clear All Filters
          </button>
        )}

        {/* Subcategories */}
        <div className="filters__section">
          <button 
            className="filters__section-header"
            onClick={() => toggleSection('subcategories')}
            aria-expanded={expandedSections.subcategories}
          >
            <span>Subcategories</span>
            <svg 
              className={`filters__chevron ${expandedSections.subcategories ? 'filters__chevron--open' : ''}`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          
          {expandedSections.subcategories && (
            <div className="filters__section-content">
              <ul className="filters__list">
                {filters.subcategories.map((subcategory) => (
                  <li key={subcategory}>
                    <label className="filters__checkbox">
                      <input
                        type="checkbox"
                        checked={activeFilters.subcategories?.includes(subcategory)}
                        onChange={() => handleCheckboxChange('subcategories', subcategory)}
                      />
                      <span className="filters__checkmark"></span>
                      <span className="filters__label">{subcategory}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Brands */}
        <div className="filters__section">
          <button 
            className="filters__section-header"
            onClick={() => toggleSection('brands')}
            aria-expanded={expandedSections.brands}
          >
            <span>Brands</span>
            <svg 
              className={`filters__chevron ${expandedSections.brands ? 'filters__chevron--open' : ''}`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          
          {expandedSections.brands && (
            <div className="filters__section-content">
              <ul className="filters__list filters__list--scrollable">
                {filters.brands.map((brand) => (
                  <li key={brand}>
                    <label className="filters__checkbox">
                      <input
                        type="checkbox"
                        checked={activeFilters.brands?.includes(brand)}
                        onChange={() => handleCheckboxChange('brands', brand)}
                      />
                      <span className="filters__checkmark"></span>
                      <span className="filters__label">{brand}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="filters__section">
          <button 
            className="filters__section-header"
            onClick={() => toggleSection('price')}
            aria-expanded={expandedSections.price}
          >
            <span>Price Range</span>
            <svg 
              className={`filters__chevron ${expandedSections.price ? 'filters__chevron--open' : ''}`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          
          {expandedSections.price && (
            <div className="filters__section-content">
              <ul className="filters__list">
                {filters.priceRanges.map((range) => (
                  <li key={range.label}>
                    <label className="filters__radio">
                      <input
                        type="radio"
                        name="price"
                        checked={activeFilters.priceRange?.label === range.label}
                        onChange={() => handleCheckboxChange('priceRange', range)}
                      />
                      <span className="filters__radiomark"></span>
                      <span className="filters__label">{range.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Customer Rating */}
        <div className="filters__section">
          <button 
            className="filters__section-header"
            onClick={() => toggleSection('rating')}
            aria-expanded={expandedSections.rating}
          >
            <span>Customer Rating</span>
            <svg 
              className={`filters__chevron ${expandedSections.rating ? 'filters__chevron--open' : ''}`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          
          {expandedSections.rating && (
            <div className="filters__section-content">
              <ul className="filters__list">
                {filters.ratings.map((rating) => (
                  <li key={rating}>
                    <label className="filters__radio">
                      <input
                        type="radio"
                        name="rating"
                        checked={activeFilters.rating === rating}
                        onChange={() => handleCheckboxChange('rating', rating)}
                      />
                      <span className="filters__radiomark"></span>
                      <span className="filters__label filters__rating-label">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            className={`filters__star ${i < rating ? 'filters__star--filled' : ''}`}
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                        <span>& Up</span>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Discount */}
        <div className="filters__section">
          <button 
            className="filters__section-header"
            onClick={() => toggleSection('discount')}
            aria-expanded={expandedSections.discount}
          >
            <span>Discount</span>
            <svg 
              className={`filters__chevron ${expandedSections.discount ? 'filters__chevron--open' : ''}`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          
          {expandedSections.discount && (
            <div className="filters__section-content">
              <ul className="filters__list">
                {filters.discounts.map((discount) => (
                  <li key={discount.value}>
                    <label className="filters__radio">
                      <input
                        type="radio"
                        name="discount"
                        checked={activeFilters.discount === discount.value}
                        onChange={() => handleCheckboxChange('discount', discount.value)}
                      />
                      <span className="filters__radiomark"></span>
                      <span className="filters__label">{discount.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Availability */}
        <div className="filters__section">
          <label className="filters__checkbox filters__availability">
            <input
              type="checkbox"
              checked={activeFilters.inStockOnly}
              onChange={() => handleCheckboxChange('inStockOnly', !activeFilters.inStockOnly)}
            />
            <span className="filters__checkmark"></span>
            <span className="filters__label">In Stock Only</span>
          </label>
        </div>

        {/* Mobile Apply Button */}
        <div className="filters__mobile-footer">
          <button className="filters__apply-btn" onClick={onMobileClose}>
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
}
