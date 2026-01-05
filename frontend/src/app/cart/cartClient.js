'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function CartClient() {
  const {cartList , setCartList} = useCart();
    useEffect(() => {
        async function fetchCart() {
          try{
            const response = await axios.get(`${BACKEND_URL}/api/cart`,
              {withCredentials : true}
            );
            setCartList(response.data)
          } catch(err){
            alert("Internal Server Error")
          }
        }
        fetchCart()
    },[])

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
              <div key={item.id} className="cart-item">
                <Image
                  src={item.image}
                  alt={item.product.name}
                  width={100}
                  height={100}
                />

                <div className="cart-item__details">
                  <h2>{item.product.name}</h2>
                  <p>₹{item.product.price.toLocaleString()}</p>

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
