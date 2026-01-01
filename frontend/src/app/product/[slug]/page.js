import { notFound } from "next/navigation";
import ProductClient from "./productClient";

async function getProduct(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}
