"use client";

import Link from "next/link";

export default function SignupClient() {
  return (
    <main className="auth-page container">
      <h1>Create Account</h1>

      <div className="auth-card">
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-primary btn-block">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
