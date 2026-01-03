'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const GUEST_WISHLIST_KEY = 'vangmaya_wishlist';

/* ---------- Helpers ---------- */

const getGuestWishlist = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY)) || [];
};

const setGuestWishlist = (items) => {
  localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(items));
};

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price / 100);

/* ---------- Component ---------- */

export default function WishlistClient() {
  const { isLoggedIn, loading } = useAuth();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  /* ---------- Fetch Wishlist ---------- */

  useEffect(() => {
    if (loading) return;

    async function fetchWishlist() {
      try {
        if (!isLoggedIn) {
          const ids = getGuestWishlist();
          if (ids.length === 0) {
            setWishlistItems([]);
            return;
          }

          const res = await axios.post(
            `${BACKEND_URL}/api/product/by-ids`,
            { ids }
          );

          setWishlistItems(res.data);
          return;
        }

        const res = await axios.get(
          `${BACKEND_URL}/api/wishlist`,
          { withCredentials: true }
        );

        setWishlistItems(res.data.map(item => item.product));

      } catch (err) {
        console.error('Failed to fetch wishlist:', err);
      } finally {
        setPageLoading(false);
      }
    }

    fetchWishlist();
  }, [isLoggedIn, loading]);

  /* ---------- Remove from Wishlist ---------- */

  const removeItem = async (productId) => {
    // Guest
    if (!isLoggedIn) {
      const updated = getGuestWishlist().filter(id => id !== productId);
      setGuestWishlist(updated);
      setWishlistItems(items => items.filter(p => p.id !== productId));
      return;
    }

    // Logged-in
    try {
      await axios.post(
        `${BACKEND_URL}/api/wishlist/toggle`,
        { productId },
        { withCredentials: true }
      );

      setWishlistItems(items => items.filter(p => p.id !== productId));
    } catch (err) {
      console.error('Failed to remove wishlist item:', err);
    }
  };

  /* ---------- UI ---------- */

  if (pageLoading) {
    return (
      <main className="wishlist-page container">
        <p>Loading wishlist...</p>
      </main>
    );
  }

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
                src={item.thumbnail}
                alt={item.name}
                width={180}
                height={180}
              />

              <div className="wishlist-item__info">
                <h2>{item.name}</h2>
                <p className="wishlist-item__price">
                  {formatPrice(item.price)}
                </p>

                <div className="wishlist-item__actions">
                  {/* Hook for cart logic */}
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
