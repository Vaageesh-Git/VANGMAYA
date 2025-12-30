// app/product/[slug]/page.js
import ProductClient from "./productClient";

export const metadata = {
  title: "Product Details | VANGMAYA",
  description: "View product details, price, and buy online on VANGMAYA.",
};

export default function ProductPage({ params }) {
  const { slug } = params;

  // Later: fetch product by slug here (server-side)
  return <ProductClient slug={slug} />;
}
