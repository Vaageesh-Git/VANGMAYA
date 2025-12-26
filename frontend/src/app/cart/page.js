// app/cart/page.js
import CartClient from './cartClient';

export const metadata = {
  title: 'Your Cart | VANGMAYA',
  description: 'Review the items in your cart and proceed to checkout.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return <CartClient />;
}
