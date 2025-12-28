"use client";

import Link from "next/link";

export default function LoginClient() {
  return (
    <main className="auth-page container">
      <h1>Login</h1>

      <div className="auth-card">
        <form className="auth-form">
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

          <button type="submit" className="btn-primary btn-block">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <Link href="/forgot-password">Forgot password?</Link>
          <p>
            New to VANGMAYA?{" "}
            <Link href="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
