// app/components/CategoryShowcase/CategoryShowcase.jsx
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    image: '/categories/electronics.png',
    href: '/category/electronics',
    icon: '📱'
  },
  {
    id: 2,
    name: 'Fashion',
    image: '/categories/fashion.png',
    href: '/category/fashion',
    icon: '👗'
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    image: '/categories/home&kitchen.png',
    href: '/category/home-kitchen',
    icon: '🏠'
  },
  {
    id: 4,
    name: 'Beauty',
    image: '/categories/beauty.png',
    href: '/category/beauty',
    icon: '💄'
  },
  {
    id: 5,
    name: 'Sports',
    image: '/categories/sports.png',
    href: '/category/sports',
    icon: '⚽'
  },
  {
    id: 6,
    name: 'Books',
    image: '/categories/books.png',
    href: '/category/books',
    icon: '📚'
  },
  {
    id: 7,
    name: 'Toys & Games',
    image: '/categories/toys&games.png',
    href: '/category/toys',
    icon: '🎮'
  },
  {
    id: 8,
    name: 'Grocery',
    image: '/categories/grocery.png',
    href: '/category/grocery',
    icon: '🛒'
  },
];

export default function CategoryShowcase() {
  return (
    <section className="categories section" aria-labelledby="categories-title" id='shop-by-category'>
      <div className="container">
        <h2 id="categories-title" className="section-title">
          Shop by Category
        </h2>
        <p className="section-subtitle">
          Browse through our wide range of categories
        </p>

        <div className="categories__grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="categories__card"
            >
              <div className="categories__image-wrapper">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="categories__image"
                />
                <div className="categories__overlay" />
              </div>
              
              <div className="categories__content">
                <span className="categories__icon">{category.icon}</span>
                <h3 className="categories__name">{category.name}</h3>
                <span className="categories__explore">
                  Explore
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
