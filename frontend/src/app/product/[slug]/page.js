import { notFound } from "next/navigation";
import ProductClient from "./productClient";

async function getProduct(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}
