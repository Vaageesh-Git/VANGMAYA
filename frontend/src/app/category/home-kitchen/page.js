import CategoryClient from "@/app/components/categoryClient";

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

export default function HomeLivingPage() {
  return (
    <CategoryClient categoryName="home-kitchen" />
  );
};