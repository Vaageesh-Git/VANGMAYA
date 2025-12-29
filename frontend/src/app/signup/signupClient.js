"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function SignupClient() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name,
            email,
            password,
            confirmPassword
        }

        try{
            const response = await axios.post('/api/auth/signup', userData)
            if (response.status === 201){
                alert("Signup Successfull")
                router.push('/')
            }

        } catch(err){
            console.log(err.message)
            if (err.response?.status === 409){
                alert("User already exists");
            } else{
                alert("Internal server error")
            }
        }
    };

  return (
    <main className="auth-page container">
      <h1>Create Account</h1>

      <div className="auth-card">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              placeholder="••••••••"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
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
