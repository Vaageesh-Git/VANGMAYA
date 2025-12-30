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

        {/* WHY VANGMAYA */}
        <section className="why-vangmaya">
          <div className="container">
            <h2 className="why-vangmaya__title">Why Vangmaya?</h2>
            <p className="why-vangmaya__subtitle">
              Everything you need. Best prices. A shopping experience you can trust.
            </p>

            <div className="why-vangmaya__grid">
              <div className="why-vangmaya__card">
                <h3>Wide Range of Products</h3>
                <p>
                  From electronics and fashion to home essentials and beauty products —
                  discover thousands of items in one place.
                </p>
              </div>

              <div className="why-vangmaya__card">
                <h3>Best Prices Guaranteed</h3>
                <p>
                  We bring you competitive pricing, exclusive deals, and value-for-money
                  products every day.
                </p>
              </div>

              <div className="why-vangmaya__card">
                <h3>Fast & Reliable Delivery</h3>
                <p>
                  Quick shipping with trusted logistics partners, delivering across
                  India safely and on time.
                </p>
              </div>

              <div className="why-vangmaya__card">
                <h3>Secure & Trusted Shopping</h3>
                <p>
                  Shop with confidence using secure payments, easy returns, and reliable
                  customer support.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
