'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function WishlistClient() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Sony WH-1000XM5 Headphones',
      price: 26990,
      image: '/images/products/electronics/sony-headphones.jpg',
    },
    {
      id: 2,
      name: 'Nike Revolution 6 Running Shoes',
      price: 3999,
      image: '/images/products/sports/nike-running-shoes.jpg',
    },
  ]);

  const removeItem = (id) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <main className="wishlist-page container">
      <h1>My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <p>Your wishlist is empty.</p>
          <Link href="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <section className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <Image
                src={item.image}
                alt={item.name}
                width={180}
                height={180}
              />

              <div className="wishlist-item__info">
                <h2>{item.name}</h2>
                <p className="wishlist-item__price">
                  ₹{item.price.toLocaleString()}
                </p>

                <div className="wishlist-item__actions">
                  <Link href="/cart" className="btn-primary">
                    Move to Cart
                  </Link>
                  <button
                    className="btn-link"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
