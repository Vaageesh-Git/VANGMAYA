'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from "../context/AuthContext";
import axios from 'axios';

const categories = [
  { name: 'Electronics', href: '/category/electronics' },
  { name: 'Fashion', href: '/category/fashion' },
  { name: 'Home & Living', href: '/category/home-kitchen' },
  { name: 'Beauty', href: '/category/beauty' },
  { name: 'Sports', href: '/category/sports' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__container container">
        {/* Logo */}

        <Link href="/" className="navbar__logo">
          <Image
            src="/vangmayaLogo.jpeg"
            alt="Vangmaya Logo"
            height={40}
            width={80}
            priority
            className='vangmayaLogo'
          />
          <span className="navbar__logo-text">Vangmaya</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar__nav">
          {/* Category Dropdown */}
          <div 
            className="navbar__dropdown"
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <button 
              className="navbar__dropdown-trigger"
              aria-expanded={isCategoryOpen}
              aria-haspopup="true"
            >
              <svg className="navbar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Categories
              <svg className="navbar__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            
            <ul className={`navbar__dropdown-menu ${isCategoryOpen ? 'navbar__dropdown-menu--open' : ''}`}>
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href} className="navbar__dropdown-item">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Search Bar */}
          <form className="navbar__search" role="search">
            <label htmlFor="search" className="visually-hidden">Search products</label>
            <input
              type="search"
              id="search"
              className="navbar__search-input"
              placeholder="Search for products, brands..."
            />
            <button type="submit" className="navbar__search-btn" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </form>
        </div>

        {/* Action Icons */}
        <div className="navbar__actions">
          { isLoggedIn &&
            <Link href="/account" className="navbar__action-btn navbar_account" aria-label="My Account">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="navbar__action-label">Account</span>
            </Link>
          }
          
          <Link href="/wishlist" className="navbar__action-btn navbar_wishlist" aria-label="Wishlist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="navbar__action-label">Wishlist</span>
          </Link>
          
          <Link href="/cart" className="navbar__action-btn navbar__cart" aria-label="Shopping Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="navbar__cart-count">0</span>
            <span className="navbar__action-label">Cart</span>
          </Link>

        {!isLoggedIn &&
          <div className='navbar-cta'>
            <Link href="/signup" className='signup-button'>Signup</Link>
          </div>
        }

          {/* Mobile Menu Toggle */}
          <button 
            className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <form className="navbar__mobile-search" role="search">
          <input type="search" placeholder="Search products..." />
          <button type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </form>
        
        <div className="navbar__mobile-categories">
          <h3>Categories</h3>
          <ul>
            {categories.map((category) => (
              <li key={category.name}>
                <Link 
                  href={category.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="navbar__mobile-links">
          <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>
            My Account
          </Link>
          <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)}>
            Orders
          </Link>
          <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
            Wishlist
          </Link>
          {!isLoggedIn &&
            <Link href="/signup" className='signup-button-mobile' onClick={() => setIsMobileMenuOpen(false)}>Signup</Link>
          }
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="navbar__overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {loading && (
        <div className="navbar-auth-placeholder" />
      )}
    </header>
  );
}
