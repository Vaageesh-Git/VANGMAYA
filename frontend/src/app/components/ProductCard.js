// app/components/ProductCard/ProductCard.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="product-card__stars" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`product-card__star ${
            i < fullStars 
              ? 'product-card__star--filled' 
              : i === fullStars && hasHalfStar 
                ? 'product-card__star--half' 
                : ''
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

export default function ProductCard({ product, viewMode = 'grid' }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAddingToCart(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  return (
    <article className={`product-card product-card--${viewMode}`}>
      {/* Badge */}
      {product.badge && (
        <span className={`product-card__badge product-card__badge--${product.badge.toLowerCase().replace(' ', '-')}`}>
          {product.badge}
        </span>
      )}

      {/* Out of Stock Overlay */}
      {!product.inStock && (
        <div className="product-card__out-of-stock">
          <span>Out of Stock</span>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        className={`product-card__wishlist ${isWishlisted ? 'product-card__wishlist--active' : ''}`}
        onClick={handleWishlistToggle}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Image */}
      <Link href={`/product/${product.id}`} className="product-card__image-link">
        <div className="product-card__image-wrapper">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes={viewMode === 'grid' 
              ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              : "(max-width: 768px) 40vw, 200px"
            }
            className="product-card__image"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="product-card__content">
        {/* Brand */}
        {product.brand && (
          <span className="product-card__brand">{product.brand}</span>
        )}

        {/* Title */}
        <Link href={`/product/${product.id}`} className="product-card__title-link">
          <h3 className="product-card__title">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="product-card__rating">
          <StarRating rating={product.rating} />
          <span className="product-card__rating-value">{product.rating}</span>
          <span className="product-card__reviews">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="product-card__price-wrapper">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="product-card__original-price">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="product-card__discount">{product.discount}% off</span>
            </>
          )}
        </div>

        {/* Delivery Info (List View) */}
        {viewMode === 'list' && (
          <p className="product-card__delivery">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            Free Delivery by <strong>Dec 28</strong>
          </p>
        )}

        {/* Add to Cart */}
        <button 
          className={`product-card__add-to-cart ${isAddingToCart ? 'product-card__add-to-cart--loading' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock || isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <span className="product-card__spinner"></span>
              Adding...
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}
