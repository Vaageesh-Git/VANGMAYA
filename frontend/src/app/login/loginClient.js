"use client";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function LoginClient() {
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setIsLoggedIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }
        try{
            const response = await axios.post(`${BACKEND_URL}/api/auth/login`, userData, {withCredentials : true})
            if (response.status === 200){
                setIsLoggedIn(true);
                router.push('/')
            }
        } catch (err){
            if (err.response?.status === 401){
                alert("Invalid Credentials")
            } else{
                alert("Internal Server Error")
            }
        }
    };
  return (
    <main className="auth-page container">
      <h1>Login</h1>

      <div className="auth-card">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary btn-block">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <Link href="/forgot-password" style={{
            color : "blue"
          }}>Forgot password?</Link>
          <p>
            New to VANGMAYA?{" "}
            <Link href="/signup" style={{
                color : "blue"
            }}>Create an account</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
