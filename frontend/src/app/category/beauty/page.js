import CategoryClient from "@/app/components/categoryClient";

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

export default function BeautyPage() {
  return (
    <CategoryClient categoryName="beauty" />
  );
}
