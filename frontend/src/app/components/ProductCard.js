'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price / 100);

export default function ProductCard({ product, viewMode = 'grid' }) {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const isWishlisted = wishlistIds.includes(product.id);

  const {
    cartLoaded,
    addToCart,
    increment,
    decrement,
    getQuantity,
  } = useCart();

  if (!cartLoaded) return null;

  const quantity = getQuantity(product.id);

  return (
    <article className={`product-card product-card--${viewMode}`}>
      {/* Wishlist */}
      <button
        className="product-card__wishlist"
        onClick={() => toggleWishlist(product.id)}
      >
        <svg
          viewBox="0 0 24 24"
          fill={isWishlisted ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          className={isWishlisted ? 'active' : ''}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Image */}
      <Link href={`/product/${product.slug}`}>
          <div className="product-card__image-wrapper">
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="product-card__image"
            />
          </div>
        </Link>

      {/* Content */}
      <div className="product-card__content">
        <Link href={`/product/${product.slug}`}>{product.name}</Link>

        <div className="product-card__price">
          {formatPrice(product.price)}
        </div>

        {/* Cart Controls */}
        {quantity === 0 ? (
          <button
            className="product-card__add-to-cart"
            onClick={() => addToCart(product.id)}
          >
            Add to Cart
          </button>
        ) : (
          <div className="product-card__qty-controls">
            <button onClick={() => decrement(product.id)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => increment(product.id)}>+</button>
          </div>
        )}
      </div>
    </article>
  );
}
