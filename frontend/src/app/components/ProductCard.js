'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price / 100); // paise → rupees
};

export default function ProductCard({ product, viewMode = 'grid' }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  return (
    <article className={`product-card product-card--${viewMode}`}>
      {/* Badge */}
      {product.badge && (
        <span className="product-card__badge">
          {product.badge}
        </span>
      )}

      {/* Out of Stock */}
      {!product.inStock && (
        <div className="product-card__out-of-stock">
          <span>Out of Stock</span>
        </div>
      )}

      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="product-card__image-link"
      >
        <div className="product-card__image-wrapper">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="product-card__image"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="product-card__content">
        {product.brand && (
          <span className="product-card__brand">{product.brand}</span>
        )}

        {/* Title */}
        <Link
          href={`/product/${product.slug}`}
          className="product-card__title-link"
        >
          <h3 className="product-card__title">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="product-card__rating">
          ⭐ {product.rating ?? 0}
          <span className="product-card__reviews">
            ({(product.reviewCount ?? 0).toLocaleString()})
          </span>
        </div>


        {/* Price */}
        <div className="product-card__price-wrapper">
          <span className="product-card__price">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="product-card__original-price">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="product-card__discount">
                {product.discountPercent}% off
              </span>
            </>
          )}
        </div>

        {/* Add to Cart */}
        <button
          className="product-card__add-to-cart"
          disabled={!product.inStock || isAddingToCart}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
