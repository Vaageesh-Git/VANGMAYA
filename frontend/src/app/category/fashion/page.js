// app/category/fashion/page.jsx
import CategoryBanner from '@/app/components/CategoryBanner';
import ProductListing from '@/app/components/ProductListing';

export const metadata = {
  title: 'Fashion - Clothing, Footwear & Accessories for Men & Women | Vangmaya',
  description:
    'Shop the latest fashion trends for men and women. Explore clothing, footwear, accessories, ethnic wear, and more at best prices on Vangmaya.',
  keywords:
    'fashion, clothing, men fashion, women fashion, footwear, accessories, ethnic wear, online shopping india',
  openGraph: {
    title: 'Fashion Store – Latest Trends & Best Prices | Vangmaya',
    description:
      'Discover trendy clothing, footwear, and accessories for every style and occasion.',
    type: 'website',
  },
};

/* ---------------- MOCK PRODUCTS ---------------- */

const fashionProducts = [
  {
    id: 1,
    name: 'Men Solid Slim Fit Casual Shirt',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.4,
    reviews: 5621,
    image: '/images/products/fashion/men-shirt.jpg',
    badge: 'Bestseller',
    brand: 'Roadster',
    inStock: true,
  },
  {
    id: 2,
    name: 'Women Floral Printed Maxi Dress',
    price: 1799,
    originalPrice: 3599,
    discount: 50,
    rating: 4.6,
    reviews: 4321,
    image: '/images/products/fashion/women-dress.jpg',
    badge: 'Trending',
    brand: 'Tokyo Talkies',
    inStock: true,
  },
  {
    id: 3,
    name: 'Men Regular Fit Blue Jeans',
    price: 1599,
    originalPrice: 2999,
    discount: 47,
    rating: 4.3,
    reviews: 9876,
    image: '/images/products/fashion/men-jeans.jpg',
    badge: null,
    brand: 'Levis',
    inStock: true,
  },
  {
    id: 4,
    name: 'Women Ethnic Kurta Set with Dupatta',
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    rating: 4.7,
    reviews: 3210,
    image: '/images/products/fashion/kurta-set.jpg',
    badge: 'Popular',
    brand: 'Biba',
    inStock: true,
  },
  {
    id: 5,
    name: 'Men Sports Running Shoes',
    price: 2799,
    originalPrice: 5999,
    discount: 53,
    rating: 4.5,
    reviews: 6543,
    image: '/images/products/fashion/men-shoes.jpg',
    badge: 'Best Deal',
    brand: 'Puma',
    inStock: true,
  },
  {
    id: 6,
    name: 'Women Casual Sneakers',
    price: 2199,
    originalPrice: 4499,
    discount: 51,
    rating: 4.4,
    reviews: 2789,
    image: '/images/products/fashion/women-sneakers.jpg',
    badge: null,
    brand: 'HRX',
    inStock: true,
  },
  {
    id: 7,
    name: 'Men Analog Watch with Leather Strap',
    price: 3499,
    originalPrice: 6999,
    discount: 50,
    rating: 4.6,
    reviews: 1890,
    image: '/images/products/fashion/men-watch.jpg',
    badge: 'Premium',
    brand: 'Fossil',
    inStock: true,
  },
  {
    id: 8,
    name: 'Women Handbag – Large Tote',
    price: 1899,
    originalPrice: 3999,
    discount: 53,
    rating: 4.5,
    reviews: 2456,
    image: '/images/products/fashion/women-handbag.jpg',
    badge: null,
    brand: 'Lavie',
    inStock: true,
  },
];

/* ---------------- CATEGORY INFO ---------------- */

const categoryInfo = {
  name: 'Fashion',
  description:
    'Explore the latest fashion trends for men and women including clothing, footwear, accessories, and ethnic wear. Style up with top brands at unbeatable prices.',
  image: '/images/banners/fashion-banner.jpg',
  totalProducts: 6240,
};

/* ---------------- FILTER OPTIONS ---------------- */

const filterOptions = {
  brands: [
    'Roadster',
    'Levis',
    'Puma',
    'HRX',
    'Biba',
    'Tokyo Talkies',
    'Fossil',
    'Lavie',
  ],
  priceRanges: [
    { label: 'Under ₹1,000', min: 0, max: 1000 },
    { label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
    { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
    { label: 'Above ₹5,000', min: 5000, max: Infinity },
  ],
  subcategories: [
    'Men Clothing',
    'Women Clothing',
    'Ethnic Wear',
    'Footwear',
    'Accessories',
    'Watches',
    'Bags',
  ],
  ratings: [4, 3, 2, 1],
  discounts: [
    { label: '20% or more', value: 20 },
    { label: '40% or more', value: 40 },
    { label: '50% or more', value: 50 },
  ],
};

export default function FashionPage() {
  return (
    <main className="category-page">
      <CategoryBanner category={categoryInfo} />
      <ProductListing
        products={fashionProducts}
        filters={filterOptions}
        categoryName="Fashion"
      />
    </main>
  );
}
