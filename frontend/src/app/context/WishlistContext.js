'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const GUEST_KEY = 'vangmaya_wishlist';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { isLoggedIn, loading } = useAuth();

  const [wishlistIds, setWishlistIds] = useState(() => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(GUEST_KEY)) || [];
  });

  const [wishlistLoaded, setWishlistLoaded] = useState(false);

  useEffect(() => {
    if (loading) return;

    async function loadWishlist() {
      try {
        if (!isLoggedIn) {
          setWishlistLoaded(true);
          return;
        }

        const res = await axios.get(
          `${BACKEND_URL}/api/wishlist/ids`,
          { withCredentials: true }
        );

        setWishlistIds(res.data);
        localStorage.setItem(GUEST_KEY, JSON.stringify(res.data));
      } catch (err) {
        console.error('Wishlist load failed:', err);
      } finally {
        setWishlistLoaded(true);
      }
    }

    loadWishlist();
  }, [isLoggedIn, loading]);

  const toggleWishlist = async (productId) => {
    if (!isLoggedIn) {
      const updated = wishlistIds.includes(productId)
        ? wishlistIds.filter(id => id !== productId)
        : [...wishlistIds, productId];

      setWishlistIds(updated);
      localStorage.setItem(GUEST_KEY, JSON.stringify(updated));
      return;
    }

    const res = await axios.post(
      `${BACKEND_URL}/api/wishlist/toggle`,
      { productId },
      { withCredentials: true }
    );

    const updated = res.data.added
      ? [...wishlistIds, productId]
      : wishlistIds.filter(id => id !== productId);

    setWishlistIds(updated);
    localStorage.setItem(GUEST_KEY, JSON.stringify(updated));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistIds, toggleWishlist, wishlistLoaded }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
