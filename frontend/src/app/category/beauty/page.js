// app/category/beauty/page.jsx
import CategoryBanner from '@/app/components/CategoryBanner';
import ProductListing from '@/app/components/ProductListing';

export const metadata = {
  title: 'Beauty & Personal Care - Makeup, Skincare, Haircare & More | Vangmaya',
  description:
    'Shop beauty and personal care products including makeup, skincare, haircare, fragrances, grooming essentials, and more at best prices on Vangmaya.',
  keywords:
    'beauty products, personal care, makeup, skincare, haircare, fragrances, grooming, online shopping india',
  openGraph: {
    title: 'Beauty & Personal Care – Look Your Best | Vangmaya',
    description:
      'Discover top beauty and personal care products from trusted brands at great prices.',
    type: 'website',
  },
};

/* ---------------- MOCK PRODUCTS ---------------- */

const beautyProducts = [
  {
    id: 1,
    name: 'Lakmé 9 to 5 Primer + Serum Foundation',
    price: 499,
    originalPrice: 699,
    discount: 29,
    rating: 4.4,
    reviews: 12876,
    image: '/images/products/beauty/lakme-foundation.jpg',
    badge: 'Bestseller',
    brand: 'Lakmé',
    inStock: true,
  },
  {
    id: 2,
    name: 'Mamaearth Onion Hair Fall Control Shampoo (400ml)',
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.3,
    reviews: 18765,
    image: '/images/products/beauty/mamaearth-shampoo.jpg',
    badge: 'Popular',
    brand: 'Mamaearth',
    inStock: true,
  },
  {
    id: 3,
    name: 'Minimalist Salicylic Acid Cleanser for Acne',
    price: 299,
    originalPrice: 349,
    discount: 14,
    rating: 4.5,
    reviews: 9456,
    image: '/images/products/beauty/minimalist-cleanser.jpg',
    badge: null,
    brand: 'Minimalist',
    inStock: true,
  },
  {
    id: 4,
    name: 'Maybelline New York Colossal Kajal (Black)',
    price: 179,
    originalPrice: 199,
    discount: 10,
    rating: 4.6,
    reviews: 25678,
    image: '/images/products/beauty/maybelline-kajal.jpg',
    badge: 'Top Rated',
    brand: 'Maybelline',
    inStock: true,
  },
  {
    id: 5,
    name: 'WOW Skin Science Apple Cider Vinegar Hair Oil',
    price: 349,
    originalPrice: 499,
    discount: 30,
    rating: 4.2,
    reviews: 7432,
    image: '/images/products/beauty/wow-hair-oil.jpg',
    badge: null,
    brand: 'WOW',
    inStock: true,
  },
  {
    id: 6,
    name: 'NIVEA Men Fresh Active Deodorant Spray',
    price: 199,
    originalPrice: 249,
    discount: 20,
    rating: 4.4,
    reviews: 8934,
    image: '/images/products/beauty/nivea-deo.jpg',
    badge: null,
    brand: 'NIVEA',
    inStock: true,
  },
  {
    id: 7,
    name: 'The Derma Co 1% Hyaluronic Sunscreen SPF 50 PA++++',
    price: 499,
    originalPrice: 699,
    discount: 29,
    rating: 4.5,
    reviews: 15678,
    image: '/images/products/beauty/derma-sunscreen.jpg',
    badge: 'Best Deal',
    brand: 'The Derma Co',
    inStock: true,
  },
  {
    id: 8,
    name: 'Plum Green Tea Alcohol-Free Toner',
    price: 390,
    originalPrice: 490,
    discount: 20,
    rating: 4.3,
    reviews: 6789,
    image: '/images/products/beauty/plum-toner.jpg',
    badge: null,
    brand: 'Plum',
    inStock: true,
  },
];

/* ---------------- CATEGORY INFO ---------------- */

const categoryInfo = {
  name: 'Beauty & Personal Care',
  description:
    'Enhance your beauty routine with makeup, skincare, haircare, fragrances, and grooming essentials from top brands at affordable prices.',
  image: '/images/banners/beauty-banner.jpg',
  totalProducts: 3580,
};

/* ---------------- FILTER OPTIONS ---------------- */

const filterOptions = {
  brands: [
    'Lakmé',
    'Mamaearth',
    'Minimalist',
    'Maybelline',
    'WOW',
    'NIVEA',
    'The Derma Co',
    'Plum',
  ],
  priceRanges: [
    { label: 'Under ₹300', min: 0, max: 300 },
    { label: '₹300 - ₹600', min: 300, max: 600 },
    { label: '₹600 - ₹1,000', min: 600, max: 1000 },
    { label: 'Above ₹1,000', min: 1000, max: Infinity },
  ],
  subcategories: [
    'Makeup',
    'Skincare',
    'Haircare',
    'Fragrances',
    'Men Grooming',
    'Personal Care',
  ],
  ratings: [4, 3, 2, 1],
  discounts: [
    { label: '20% or more', value: 20 },
    { label: '30% or more', value: 30 },
    { label: '50% or more', value: 50 },
  ],
};

export default function BeautyPage() {
  return (
    <main className="category-page">
      <CategoryBanner category={categoryInfo} />
      <ProductListing
        products={beautyProducts}
        filters={filterOptions}
        categoryName="Beauty & Personal Care"
      />
    </main>
  );
}
