'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import axios from 'axios';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price / 100);

export default function ProductCard({ product, viewMode = 'grid' }) {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const isWishlisted = wishlistIds.includes(product.id);
  const { cartList, updateQuantity, removeItem } = useCart();


  const handleAddToCart = async (productId) => {
    try{
      const response = await axios.post(`${BACKEND_URL}/api/cart/add`, {productId},  {withCredentials : true});
      console.log(response)
    } catch(err){
      console.error(err.message)
    }
  };

  const cartItem = cartList.find(
    (item) => item.product.id === product.id
  );

  const quantity = cartItem?.quantity ?? 0;

  return (
    <article className={`product-card product-card--${viewMode}`}>
      {/* Badge */}
      {product.badge && (
        <span className="product-card__badge">{product.badge}</span>
      )}

      {/* Wishlist Button */}
      <button
        className={`product-card__wishlist ${
          isWishlisted ? 'product-card__wishlist--active' : ''
        }`}
        onClick={() => toggleWishlist(product.id)}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg
          viewBox="0 0 24 24"
          fill={isWishlisted ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

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
            loading="lazy"
            className="product-card__image"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="product-card__content">
        {product.brand && (
          <span className="product-card__brand">{product.brand}</span>
        )}

        <Link
          href={`/product/${product.slug}`}
          className="product-card__title-link"
        >
          <h3 className="product-card__title">{product.name}</h3>
        </Link>

        <div className="product-card__rating">
          ⭐ {product.rating ?? 0}
          <span>
            ({(product.reviewCount ?? 0).toLocaleString()})
          </span>
        </div>

        <div className="product-card__price-wrapper">
          <span className="product-card__price">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice &&
            product.originalPrice > product.price && (
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
      {/* Add to Cart / Quantity Controls */}
      {quantity === 0 ? (
        <button
          className="product-card__add-to-cart"
          onClick={() => handleAddToCart(product.id)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Add to Cart
        </button>
      ) : (
        <div className="product-card__qty-controls">
          <button
            onClick={() =>
              quantity === 1
                ? removeItem(cartItem.id)
                : updateQuantity(cartItem.id, quantity - 1)
            }
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              updateQuantity(cartItem.id, quantity + 1)
            }
          >
            +
          </button>
        </div>
      )}

      </div>

    </article>
  );
};