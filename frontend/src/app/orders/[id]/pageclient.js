"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function OrderDetailsClient() {
  const { isLoggedIn, authLoaded } = useAuth();
  const router = useRouter();
  const { id: orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoaded) return;
    if (!isLoggedIn) router.replace("/login");
  }, [authLoaded, isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn || !orderId) return;

    async function fetchOrder() {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/order/${orderId}`,
          { withCredentials: true }
        );
        
        setOrder(res.data);
      } catch (err) {
        router.replace("/orders");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [isLoggedIn, orderId, router]);

  if (!authLoaded || !isLoggedIn || loading) return null;
  if (!order) return null;

  return (
    <main className="order-details container">
      <Link href="/orders" className="back-link">
        ← Back to Orders
      </Link>

      <h1>Order Details</h1>

      {/* Order Summary */}
      <section className="order-summary">
        <div>
          <p><strong>Order ID:</strong> #{order.id}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toDateString()}</p>
        </div>

        <div className={`order-status status-${order.status.toLowerCase()}`}>
          {order.status}
        </div>
      </section>

      {/* Shipping Address */}
      <section className="order-address">
        <h3>Shipping Address</h3>
        <p>{order.address.name}</p>
        <p>{order.address.line1}</p>
        {order.address.line2 && <p>{order.address.line2}</p>}
        <p>
          {order.address.city}, {order.address.state} – {order.address.pincode}
        </p>
        <p>📞 {order.address.phone}</p>
      </section>

      {/* Order Items */}
      <section className="order-items">
        <h3>Items</h3>

        {order.items.map(item => (
          <div key={item.id} className="order-item">
            <img
              src={item.product.thumbnail}
              alt={item.product.name}
              className="order-item-img"
            />

            <div className="order-item-info">
              <p className="order-item-name">{item.product.name}</p>
              <p>Quantity: {item.quantity}</p>
            </div>

            <div className="order-item-price">
              ₹{(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        ))}
      </section>

      {/* Total */}
      <section className="order-total">
        <h2>Total: ₹{order.totalAmount.toLocaleString()}</h2>
      </section>
    </main>
  );
}
