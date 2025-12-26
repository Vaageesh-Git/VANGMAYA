// app/components/CategoryBanner/CategoryBanner.jsx
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryBanner({ category }) {
  return (
    <section className="category-banner">
      {/* Background Image */}
      <div className="category-banner__bg">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          className="category-banner__image"
          sizes="100vw"
        />
        <div className="category-banner__overlay" />
      </div>

      {/* Content */}
      <div className="container">
        <div className="category-banner__content">
          {/* Breadcrumb */}
          <nav className="category-banner__breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li aria-current="page">{category.name}</li>
            </ol>
          </nav>

          <h1 className="category-banner__title">{category.name}</h1>
          <p className="category-banner__description">{category.description}</p>
          <p className="category-banner__count">
            <span>{category.totalProducts.toLocaleString()}</span> products available
          </p>
        </div>
      </div>
    </section>
  );
}
