'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function CartClient() {
  const {
    cartList,
    cartLoaded,
    increment,
    decrement,
    removeFromCart,
  } = useCart();

  if (!cartLoaded) return null;

  const subtotal = cartList.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <main className="cart-page container">
      <h1>Your Cart</h1>

      {cartList.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link href="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {cartList.map((item) => (
              <div key={item.product.id} className="cart-item">
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  width={100}
                  height={100}
                />

                <div className="cart-item__details">
                  <h2>{item.product.name}</h2>
                  <p>₹{item.product.price.toLocaleString()}</p>

                  <div className="cart-item__controls">
                    <button onClick={() => decrement(item.product.id)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increment(item.product.id)}>
                      +
                    </button>
                  </div>

                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>
            <p>Subtotal: ₹{subtotal.toLocaleString()}</p>

            <Link href="/checkout" className="btn-primary btn-block">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
