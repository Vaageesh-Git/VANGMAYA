import CategoryClient from "@/app/components/categoryClient";

export const metadata = {
  title: 'Fashion - Clothing, Footwear & Accessories for Men & Women | Vangmaya',
  description:
    'Shop the latest fashion trends for men and women. Explore clothing, footwear, accessories, ethnic wear, and more at best prices on Vangmaya.',
  keywords:
    'fashion, clothing, men fashion, women fashion, footwear, accessories, ethnic wear, online shopping india',
  openGraph: {
    title: 'Fashion Store - Latest Trends & Best Prices | Vangmaya',
    description:
      'Discover trendy clothing, footwear, and accessories for every style and occasion.',
    type: 'website',
  },
};

export default function FashionPage() {
  return (
    <CategoryClient categoryName="fashion" />
  );
}
