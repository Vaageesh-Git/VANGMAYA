// app/coming-soon/page.jsx
import Link from "next/link";

export const metadata = {
  title: "Coming Soon | VANGMAYA",
  description:
    "This section is coming soon on VANGMAYA. We’re working hard to bring you exciting products and offers.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ComingSoonPage() {
  return (
    <main className="coming-soon">
      <div className="coming-soon__container">
        <h1 className="coming-soon__title">Coming Soon 🚀</h1>
        <p className="coming-soon__subtitle">
          We’re working hard to bring this section live.
        </p>

        <p className="coming-soon__description">
          Stay tuned for exciting products, great deals, and a better shopping
          experience on <strong>VANGMAYA</strong>.
        </p>

        <div className="coming-soon__actions">
          <Link href="/" className="coming-soon__btn coming-soon__btn--primary">
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
