"use client";

import Link from "next/link";
import { useAuth } from '../context/AuthContext';

export default function AccountDashboardClient() {

  const { user,authLoaded } = useAuth();

  if (!authLoaded) {
    return null;
  }

  return (
    <main className="account-dashboard container">
      <h1>My Account</h1>

      <div className="account-layout">
        {/* SIDEBAR */}
        <aside className="account-sidebar">
          <div className="account-user">
            <div className="account-avatar">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="account-name">{user.name}</p>
              <p className="account-email">{user.email}</p>
            </div>
          </div>

          <nav className="account-nav">
            <Link href="/orders">My Orders</Link>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/account/addresses">Addresses</Link>
            <Link href="/account/profile">Profile Settings</Link>
            <button className="account-logout">Logout</button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <section className="account-content">
          <h2>Account Overview</h2>

          <div className="account-cards">
            <Link href="/orders" className="account-card">
              <h3>Orders</h3>
              <p>Track, return, or buy things again</p>
            </Link>

            <Link href="/wishlist" className="account-card">
              <h3>Wishlist</h3>
              <p>Your saved items</p>
            </Link>

            <Link href="/account/addresses" className="account-card">
              <h3>Addresses</h3>
              <p>Manage delivery addresses</p>
            </Link>

            <Link href="/account/profile" className="account-card">
              <h3>Profile</h3>
              <p>Edit name, email, and password</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
