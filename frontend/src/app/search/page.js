import axios from "axios";
import ProductCard from '../components/ProductCard';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function SearchPage({ searchParams }) {
  const { q: query = "" } = await searchParams;

  if (!query) {
    return <p style={{ padding: 20 }}>No search query</p>;
  }

  const res = await axios.get(
    `${BACKEND_URL}/api/search?searchQuery=${query}&limit=50`
  );

  const products = res.data;

  return (
    <div className="search-page container">
      <h2>
        Search results for "<strong>{query}</strong>"
      </h2>

      {products.length === 0 && <p>No products found</p>}

      <div className="search-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode="grid"
          />
        ))}
      </div>
    </div>
  );
}
