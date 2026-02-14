import ProductCard from './ProductCard';
import axios from 'axios';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getFeaturedProducts() {
  try{
      const res = await axios.get(`${BACKEND_URL}/api/product/featured`)
      return res.data;
  } catch(err){
    console.log(err.message)
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="featured section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>

        <div className="featured__grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
