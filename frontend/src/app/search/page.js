import axios from "axios";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || "";

  if (!query) {
    return <p style={{ padding: 20 }}>No search query</p>;
  }

  const res = await axios.get(
    `${BACKEND_URL}/api/search?searchQuery=${query}&limit=50`
  );

  const products = res.data;
  console.log(products)

  return (
    <div className="search-page container">
      <h2>
        Search results for "<strong>{query}</strong>"
      </h2>

      {products.length === 0 && <p>No products found</p>}

      <div className="search-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="search-card"
          >
            <img src={product.thumbnail} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
