import CategoryClient from "@/app/components/categoryClient";

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

export default function SportsPage() {
  return (
    <CategoryClient categoryName="sports" />
  );
}
