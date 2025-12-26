// app/category/sports/page.jsx
import CategoryBanner from '@/app/components/CategoryBanner';
import ProductListing from '@/app/components/ProductListing';

export const metadata = {
  title: 'Sports & Fitness - Equipment, Activewear & Accessories | Vangmaya',
  description:
    'Shop sports and fitness essentials including gym equipment, sportswear, shoes, accessories, and outdoor gear at best prices on Vangmaya.',
  keywords:
    'sports products, fitness equipment, gym accessories, sportswear, running shoes, outdoor sports, online shopping india',
  openGraph: {
    title: 'Sports & Fitness – Gear Up & Get Active | Vangmaya',
    description:
      'Discover top-quality sports and fitness products to power your active lifestyle.',
    type: 'website',
  },
};

/* ---------------- MOCK PRODUCTS ---------------- */

const sportsProducts = [
  {
    id: 1,
    name: 'Strauss Adjustable Dumbbell Set (20kg)',
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    rating: 4.4,
    reviews: 8456,
    image: '/images/products/sports/dumbbell-set.jpg',
    badge: 'Bestseller',
    brand: 'Strauss',
    inStock: true,
  },
  {
    id: 2,
    name: 'Nike Revolution 6 Running Shoes (Men)',
    price: 3999,
    originalPrice: 6995,
    discount: 43,
    rating: 4.6,
    reviews: 5643,
    image: '/images/products/sports/nike-running-shoes.jpg',
    badge: 'Top Rated',
    brand: 'Nike',
    inStock: true,
  },
  {
    id: 3,
    name: 'Yonex GR 303 Badminton Racquet',
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.5,
    reviews: 12456,
    image: '/images/products/sports/yonex-racquet.jpg',
    badge: null,
    brand: 'Yonex',
    inStock: true,
  },
  {
    id: 4,
    name: 'Adidas Training Track Suit (Men)',
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    rating: 4.4,
    reviews: 2310,
    image: '/images/products/sports/adidas-tracksuit.jpg',
    badge: 'Popular',
    brand: 'Adidas',
    inStock: true,
  },
  {
    id: 5,
    name: 'Cosco Football Size 5 (FIFA Approved)',
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.3,
    reviews: 6789,
    image: '/images/products/sports/cosco-football.jpg',
    badge: null,
    brand: 'Cosco',
    inStock: true,
  },
  {
    id: 6,
    name: 'Puma Training Gym Gloves',
    price: 899,
    originalPrice: 1499,
    discount: 40,
    rating: 4.2,
    reviews: 3456,
    image: '/images/products/sports/gym-gloves.jpg',
    badge: null,
    brand: 'Puma',
    inStock: true,
  },
  {
    id: 7,
    name: 'Decathlon Yoga Mat Anti-Slip (6mm)',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.6,
    reviews: 9876,
    image: '/images/products/sports/yoga-mat.jpg',
    badge: 'Best Deal',
    brand: 'Decathlon',
    inStock: true,
  },
  {
    id: 8,
    name: 'SG Club Cricket Bat (English Willow)',
    price: 4599,
    originalPrice: 6999,
    discount: 34,
    rating: 4.5,
    reviews: 1876,
    image: '/images/products/sports/cricket-bat.jpg',
    badge: null,
    brand: 'SG',
    inStock: true,
  },
];

/* ---------------- CATEGORY INFO ---------------- */

const categoryInfo = {
  name: 'Sports & Fitness',
  description:
    'Stay active and fit with a wide range of sports and fitness products including gym equipment, sportswear, footwear, and accessories from trusted brands.',
  image: '/images/banners/sports-banner.jpg',
  totalProducts: 2960,
};

/* ---------------- FILTER OPTIONS ---------------- */

const filterOptions = {
  brands: [
    'Nike',
    'Adidas',
    'Puma',
    'Decathlon',
    'Yonex',
    'Cosco',
    'SG',
    'Strauss',
  ],
  priceRanges: [
    { label: 'Under ₹1,000', min: 0, max: 1000 },
    { label: '₹1,000 - ₹3,000', min: 1000, max: 3000 },
    { label: '₹3,000 - ₹6,000', min: 3000, max: 6000 },
    { label: 'Above ₹6,000', min: 6000, max: Infinity },
  ],
  subcategories: [
    'Fitness Equipment',
    'Sportswear',
    'Footwear',
    'Cricket',
    'Badminton',
    'Football',
    'Yoga & Training',
  ],
  ratings: [4, 3, 2, 1],
  discounts: [
    { label: '20% or more', value: 20 },
    { label: '40% or more', value: 40 },
    { label: '50% or more', value: 50 },
  ],
};

export default function SportsPage() {
  return (
    <main className="category-page">
      <CategoryBanner category={categoryInfo} />
      <ProductListing
        products={sportsProducts}
        filters={filterOptions}
        categoryName="Sports & Fitness"
      />
    </main>
  );
}
