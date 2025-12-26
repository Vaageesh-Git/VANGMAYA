// app/category/home-living/page.jsx
import CategoryBanner from '@/app/components/CategoryBanner';
import ProductListing from '@/app/components/ProductListing';

export const metadata = {
  title: 'Home & Living - Furniture, Decor, Kitchen & More | Vangmaya',
  description:
    'Shop home and living essentials including furniture, home decor, kitchenware, bedding, lighting, and more at best prices on Vangmaya.',
  keywords:
    'home and living, furniture, home decor, kitchen appliances, bedding, lighting, online shopping india',
  openGraph: {
    title: 'Home & Living – Upgrade Your Home | Vangmaya',
    description:
      'Discover stylish and affordable home & living products to enhance your everyday living.',
    type: 'website',
  },
};

/* ---------------- MOCK PRODUCTS ---------------- */

const homeLivingProducts = [
  {
    id: 1,
    name: 'Wooden 4-Seater Dining Table Set',
    price: 24999,
    originalPrice: 39999,
    discount: 38,
    rating: 4.6,
    reviews: 1245,
    image: '/images/products/home-living/dining-table.jpg',
    badge: 'Bestseller',
    brand: 'Urban Living',
    inStock: true,
  },
  {
    id: 2,
    name: '3-Seater Fabric Sofa with Cushions',
    price: 32999,
    originalPrice: 49999,
    discount: 34,
    rating: 4.5,
    reviews: 987,
    image: '/images/products/home-living/sofa.jpg',
    badge: 'Top Rated',
    brand: 'HomeTown',
    inStock: true,
  },
  {
    id: 3,
    name: 'Queen Size Bedsheet Set (Cotton, 3 Pieces)',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.4,
    reviews: 5643,
    image: '/images/products/home-living/bedsheet.jpg',
    badge: null,
    brand: 'Spaces',
    inStock: true,
  },
  {
    id: 4,
    name: 'LED Floor Lamp with Warm Light',
    price: 3499,
    originalPrice: 5999,
    discount: 42,
    rating: 4.3,
    reviews: 876,
    image: '/images/products/home-living/floor-lamp.jpg',
    badge: 'New',
    brand: 'Philips',
    inStock: true,
  },
  {
    id: 5,
    name: 'Non-Stick Cookware Set (5 Pieces)',
    price: 2199,
    originalPrice: 3999,
    discount: 45,
    rating: 4.5,
    reviews: 3421,
    image: '/images/products/home-living/cookware.jpg',
    badge: 'Best Deal',
    brand: 'Prestige',
    inStock: true,
  },
  {
    id: 6,
    name: 'Decorative Wall Clock – Vintage Design',
    price: 999,
    originalPrice: 1999,
    discount: 50,
    rating: 4.2,
    reviews: 2890,
    image: '/images/products/home-living/wall-clock.jpg',
    badge: null,
    brand: 'Ajanta',
    inStock: true,
  },
  {
    id: 7,
    name: 'Memory Foam Pillow (Set of 2)',
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    rating: 4.6,
    reviews: 1987,
    image: '/images/products/home-living/pillow.jpg',
    badge: 'Popular',
    brand: 'Wakefit',
    inStock: true,
  },
  {
    id: 8,
    name: 'Indoor Plant with Ceramic Pot',
    price: 799,
    originalPrice: 1499,
    discount: 47,
    rating: 4.4,
    reviews: 1543,
    image: '/images/products/home-living/indoor-plant.jpg',
    badge: null,
    brand: 'Ugaoo',
    inStock: true,
  },
];

/* ---------------- CATEGORY INFO ---------------- */

const categoryInfo = {
  name: 'Home & Living',
  description:
    'Upgrade your home with stylish furniture, elegant decor, functional kitchenware, bedding, lighting, and everyday essentials at unbeatable prices.',
  image: '/images/banners/home-living-banner.jpg',
  totalProducts: 4120,
};

/* ---------------- FILTER OPTIONS ---------------- */

const filterOptions = {
  brands: [
    'Urban Living',
    'HomeTown',
    'Wakefit',
    'Prestige',
    'Philips',
    'Spaces',
    'Ajanta',
    'Ugaoo',
  ],
  priceRanges: [
    { label: 'Under ₹1,000', min: 0, max: 1000 },
    { label: '₹1,000 - ₹5,000', min: 1000, max: 5000 },
    { label: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
    { label: 'Above ₹15,000', min: 15000, max: Infinity },
  ],
  subcategories: [
    'Furniture',
    'Home Decor',
    'Kitchen & Dining',
    'Bedding',
    'Lighting',
    'Storage',
    'Plants',
  ],
  ratings: [4, 3, 2, 1],
  discounts: [
    { label: '20% or more', value: 20 },
    { label: '40% or more', value: 40 },
    { label: '50% or more', value: 50 },
  ],
};

export default function HomeLivingPage() {
  return (
    <main className="category-page">
      <CategoryBanner category={categoryInfo} />
      <ProductListing
        products={homeLivingProducts}
        filters={filterOptions}
        categoryName="Home & Living"
      />
    </main>
  );
}
