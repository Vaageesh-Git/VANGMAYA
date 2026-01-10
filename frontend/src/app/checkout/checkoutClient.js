"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useAddress } from "../context/AddressContext";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function CheckoutClient() {
  const router = useRouter();
  const { isLoggedIn, authLoaded } = useAuth();
  const { cartList } = useCart();
  const {addresses} = useAddress();
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (!authLoaded) return;
    if (!isLoggedIn) router.replace("/login");
  }, [authLoaded, isLoggedIn, router]);

  useEffect(() => {
    if (cartList.length === 0) {
      router.replace("/cart");
    }
  }, [cartList, router]);

  if (!authLoaded) return null;

  return (
    <main className="checkout container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        {/* LEFT */}
        <section className="checkout-main">
          {/* Address */}
          <div className="checkout-section">
            <h2>Delivery Address</h2>

            {addresses.map(addr => (
              <label key={addr.id} className="checkout-address">
                <input
                  type="radio"
                  checked={selectedAddress === addr.id}
                  onChange={() => setSelectedAddress(addr.id)}
                />
                <div>
                  <strong>{addr.name}</strong>
                  <p>{addr.line1}, {addr.city}, {addr.state} - {addr.pincode}</p>
                  <p>📞 {addr.phone}</p>
                </div>
              </label>
            ))}
          </div>

          {/* Payment */}
          <div className="checkout-section">
            <h2>Payment Method</h2>
            <label className="checkout-payment">
              <input type="radio" checked readOnly />
              Cash on Delivery
            </label>
          </div>
        </section>

        {/* RIGHT */}
        <aside className="checkout-summary">
          <h3>Order Summary</h3>

          {cartList.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.product.name} × {item.quantity}</span>
              <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}

          <div className="summary-total">
            <span>Total</span>
            <span>
              ₹{cartList.reduce(
                (t, i) => t + i.product.price * i.quantity, 0
              ).toLocaleString()}
            </span>
          </div>

        <button
            className="btn-primary btn-place-order"
            disabled={!selectedAddress}
        >
            Place Order
        </button>
        </aside>
      </div>
    </main>
  );
}
