import CategoryShowcase from "./components/CategoryShowcase";
import FeaturedProducts from "./components/FeaturedProducts";
import Hero from "./components/Hero";

/* ---------- SEO METADATA ---------- */
export const metadata = {
  title: "Shop Online at Best Prices",
  description:
    "Shop a wide range of quality products at the best prices on VANGMAYA. Discover trending products, top categories, and exclusive deals.",
};

/* ---------- SSG CONFIG ---------- */
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <main>
        <Hero />

        {/* Categories */}
        <section aria-labelledby="categories-heading">
          <CategoryShowcase />
        </section>

        {/* Featured Products */}
        <section aria-labelledby="featured-products-heading">
          <FeaturedProducts />
        </section>
      </main>
    </>
  );
}
