// app/wishlist/page.js
import WishlistClient from './wishClient';

export const metadata = {
  title: 'My Wishlist | VANGMAYA',
  description: 'View and manage your wishlist on VANGMAYA.',
  robots: {
    index: false,   // Wishlist pages should not be indexed
    follow: false,
  },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
