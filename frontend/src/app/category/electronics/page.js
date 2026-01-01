import CategoryClient from "@/app/components/categoryClient";

export const metadata = {
  title: 'Electronics - Smartphones, Laptops, Gadgets & More | Vangmaya',
  description: 'Shop the latest electronics including smartphones, laptops, tablets, headphones, smartwatches, and more at best prices. Fast delivery across India.',
  keywords: 'electronics, smartphones, laptops, gadgets, headphones, smartwatch, india, online shopping',
  openGraph: {
    title: 'Electronics - Best Deals on Gadgets | Vangmaya',
    description: 'Discover amazing deals on electronics. Shop smartphones, laptops, and more.',
    type: 'website',
  },
};

export default function ElectronicsPage(){
  return (
    <CategoryClient categoryName="electronics" />
  )
}