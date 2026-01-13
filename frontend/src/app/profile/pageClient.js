"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ProfileClient() {
  const { isLoggedIn, authLoaded, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoaded) return;
    if (!isLoggedIn) router.replace("/login");
  }, [authLoaded, isLoggedIn, router]);

  if (!authLoaded || !isLoggedIn ) return null;
  if (!user) return null;

  return (
    <main className="profile-page container">
      <h1>My Profile</h1>

      <section className="profile-card">
        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">
          <p className="profile-name">{user.name}</p>
          <p className="profile-email">{user.email}</p>
        </div>
      </section>

      <section className="profile-actions">
        <Link href="/orders" className="profile-link">
          My Orders →
        </Link>

        <Link href="/addresses" className="profile-link">
          Manage Addresses →
        </Link>

        <button className="logout-btn">
          Logout
        </button>
      </section>
    </main>
  );
};