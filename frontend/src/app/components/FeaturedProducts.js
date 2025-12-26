// app/components/FeaturedProducts/FeaturedProducts.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Earbuds Pro',
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    rating: 4.5,
    reviews: 2847,
    image: '/images/products/earbuds.jpg',
    badge: 'Bestseller'
  },
  {
    id: 2,
    name: 'Men\'s Casual Cotton Shirt',
    price: 899,
    originalPrice: 1499,
    discount: 40,
    rating: 4.3,
    reviews: 1256,
    image: '/images/products/shirt.jpg',
    badge: null
  },
  {
    id: 3,
    name: 'Smart Watch Series 5',
    price: 4999,
    originalPrice: 8999,
    discount: 44,
    rating: 4.7,
    reviews: 3421,
    image: '/images/products/watch.jpg',
    badge: 'Top Rated'
  },
  {
    id: 4,
    name: 'Premium Yoga Mat - 6mm',
    price: 799,
    originalPrice: 1299,
    discount: 38,
    rating: 4.4,
    reviews: 892,
    image: '/images/products/yoga-mat.jpg',
    badge: null
  },
  {
    id: 5,
    name: 'Organic Face Serum 30ml',
    price: 649,
    originalPrice: 999,
    discount: 35,
    rating: 4.6,
    reviews: 1567,
    image: '/images/products/serum.jpg',
    badge: 'New'
  },
  {
    id: 6,
    name: 'Portable Bluetooth Speaker',
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.2,
    reviews: 987,
    image: '/images/products/speaker.jpg',
    badge: null
  },
  {
    id: 7,
    name: 'Women\'s Running Shoes',
    price: 2499,
    originalPrice: 3999,
    discount: 37,
    rating: 4.5,
    reviews: 2134,
    image: '/images/products/shoes.jpg',
    badge: 'Popular'
  },
  {
    id: 8,
    name: 'Stainless Steel Water Bottle',
    price: 449,
    originalPrice: 699,
    discount: 36,
    rating: 4.3,
    reviews: 654,
    image: '/images/products/bottle.jpg',
    badge: null
  },
];

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

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="featured section" aria-labelledby="featured-title">
      <div className="container">
        <h2 id="featured-title" className="section-title">
          Featured Products
        </h2>
        <p className="section-subtitle">
          Handpicked deals just for you
        </p>

        <div className="featured__grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              {/* Badge */}
              {product.badge && (
                <span className={`product-card__badge product-card__badge--${product.badge.toLowerCase().replace(' ', '-')}`}>
                  {product.badge}
                </span>
              )}

              {/* Wishlist Button */}
              <button
                className={`product-card__wishlist ${wishlist.includes(product.id) ? 'product-card__wishlist--active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg viewBox="0 0 24 24" fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
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
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="product-card__image"
                    loading="lazy"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="product-card__content">
                <Link href={`/product/${product.id}`} className="product-card__title-link">
                  <h3 className="product-card__title">{product.name}</h3>
                </Link>

                {/* Rating */}
                <div className="product-card__rating">
                  <StarRating rating={product.rating} />
                  <span className="product-card__rating-text">
                    {product.rating} ({product.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Price */}
                <div className="product-card__price-wrapper">
                  <span className="product-card__price">{formatPrice(product.price)}</span>
                  <span className="product-card__original-price">{formatPrice(product.originalPrice)}</span>
                  <span className="product-card__discount">{product.discount}% off</span>
                </div>

                {/* Add to Cart */}
                <button className="product-card__add-to-cart">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="featured__view-all">
          <Link href="/products" className="featured__view-all-btn">
            View All Products
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
