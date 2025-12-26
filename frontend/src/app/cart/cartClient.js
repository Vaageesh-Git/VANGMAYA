'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartClient() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 156900,
      quantity: 1,
      image: '/images/products/electronics/iphone-15-pro.jpg',
    },
    {
      id: 2,
      name: 'Sony WH-1000XM5 Headphones',
      price: 26990,
      quantity: 1,
      image: '/images/products/electronics/sony-headphones.jpg',
    },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="cart-page container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link href="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                />

                <div className="cart-item__details">
                  <h2>{item.name}</h2>
                  <p>₹{item.price.toLocaleString()}</p>

                  <div className="cart-item__controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>

                  <button onClick={() => removeItem(item.id)}>Remove</button>
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
