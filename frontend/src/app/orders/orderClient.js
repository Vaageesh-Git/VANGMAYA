"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function OrdersClient() {
  const { isLoggedIn, authLoaded } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!authLoaded) return;

    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [authLoaded, isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchOrders() {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/order`,
          { withCredentials: true }
        );
        setOrders(res.data);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [isLoggedIn]);

  if (!authLoaded) return null;
  if (!isLoggedIn) return null;
  if (loading) return null;

  return (
    <main className="orders-page container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <p>You haven’t placed any orders yet.</p>
          <Link href="/" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <p className="order-id">Order #{order.id}</p>
                  <p className="order-date">
                    {new Date(order.createdAt).toDateString()}
                  </p>
                </div>

                <div className={`order-status status-${order.status.toLowerCase()}`}>
                  {order.status}
                </div>
              </div>

              <div className="order-items">
                {order.items.slice(0, 2).map((item, idx) => (
                  <p key={idx}>
                    {item.product.name} × {item.quantity}
                  </p>
                ))}
                {order.items.length > 2 && (
                  <p className="order-more">
                    +{order.items.length - 2} more items
                  </p>
                )}
              </div>

              <div className="order-footer">
                <p className="order-total">
                  ₹{order.totalAmount.toLocaleString()}
                </p>

                <Link href={`/orders/${order.id}`} className="btn-secondary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
