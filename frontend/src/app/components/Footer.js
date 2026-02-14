// app/components/Footer/Footer.jsx
import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  shop: {
    title: 'Shop',
    links: [
      { name: 'All Products', href: '/products' },
      { name: 'Best Sellers', href: '#featured' },
      { name: 'Gift Cards', href: '/gift-cards' },
    ]
  },
  categories: {
    title: 'Categories',
    links: [
      { name: 'Electronics', href: '/category/electronics' },
      { name: 'Fashion', href: '/category/fashion' },
      { name: 'Home & Living', href: '/category/home-kitchen' },
      { name: 'Beauty', href: '/category/beauty' },
      { name: 'Sports & Fitness', href: '/category/sports' },
      { name: 'Books', href: '/category/books' },
    ]
  },
  customerService: {
    title: 'Customer Service',
    links: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Shipping Info', href: '/shipping' },
    ]
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Affiliate Program', href: '/affiliates' },
      { name: 'Sell on Vangmaya', href: '/sell' },
    ]
  }
};

const socialLinks = [
  { 
    name: 'Facebook', 
    href: 'https://facebook.com/vangmaya',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )
  },
  { 
    name: 'Instagram', 
    href: 'https://instagram.com/vangmaya',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    )
  },
  { 
    name: 'Twitter', 
    href: 'https://twitter.com/vangmaya',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  { 
    name: 'YouTube', 
    href: 'https://youtube.com/vangmaya',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  { 
    name: 'LinkedIn', 
    href: 'https://linkedin.com/company/vangmaya',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
];

const paymentMethods = [
  { name: 'Visa', image: '/images/payments/visa.svg' },
  { name: 'Mastercard', image: '/images/payments/mastercard.svg' },
  { name: 'UPI', image: '/images/payments/upi.svg' },
  { name: 'Paytm', image: '/images/payments/paytm.svg' },
  { name: 'Google Pay', image: '/images/payments/gpay.svg' },
  { name: 'PhonePe', image: '/images/payments/phonepe.svg' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand">
              <Link href="/" className="footer__logo">
                <span className="footer__logo-text">Vangmaya</span>
              </Link>
              <p className="footer__tagline">
                Your one-stop destination for everything you need. Quality products, 
                best prices, and exceptional service — delivered to your doorstep.
              </p>
              
              {/* Contact Info */}
              <div className="footer__contact">
                <div className="footer__contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>+91 8745988778</span>
                </div>
                <div className="footer__contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>vangmaya2025@gmail.com</span>
                </div>
                <div className="footer__contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Delhi, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="footer__social">
                <span className="footer__social-label">Follow Us:</span>
                <div className="footer__social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="footer__social-link"
                      aria-label={`Follow us on ${social.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="footer__links-grid">
              {Object.values(footerLinks).map((section) => (
                <div key={section.title} className="footer__links-column">
                  <h3 className="footer__links-title">{section.title}</h3>
                  <ul className="footer__links-list">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="footer__link">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* App Download & Payment Section */}
      <div className="footer__middle">
        <div className="container">
          <div className="footer__middle-content">

            {/* Payment Methods */}
            <div className="footer__payments">
              <h4 className="footer__payments-title">Secure Payment Methods</h4>
              <div className="footer__payments-grid">
                {paymentMethods.map((method) => (
                  <div key={method.name} className="footer__payment-method" title={method.name}>
                    <Image
                      src={method.image}
                      alt={method.name}
                      width={48}
                      height={32}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <p className="footer__payments-text">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                100% Secure Payments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} <strong>Vangmaya</strong>. All rights reserved.
            </p>
            
            <nav className="footer__legal" aria-label="Legal links">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span className="footer__legal-divider">|</span>
              <Link href="/terms-of-service">Terms of Service</Link>
              <span className="footer__legal-divider">|</span>
              <Link href="/cookie-policy">Cookie Policy</Link>
              <span className="footer__legal-divider">|</span>
              <Link href="/sitemap">Sitemap</Link>
            </nav>

            <p className="footer__made-in">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
