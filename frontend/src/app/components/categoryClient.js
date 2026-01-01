'use client'
import axios from "axios";
import { useEffect,useState } from "react";
import CategoryBanner from "./CategoryBanner";
import ProductListing from "./ProductListing";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

import { categoryInfoMap } from "../config/categoryInfo";
import { filterOptions } from "../config/filterOptions";

export default function CategoryClient({categoryName}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryInfo = categoryInfoMap[categoryName];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/product?category=${categoryName}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categoryName]);
  return (
    <>
      <main className="category-page">
        <CategoryBanner category={categoryInfo} />
        <ProductListing
          products={products}
          filters={filterOptions}
          categoryName={categoryName}
          loading={loading}
        />  
      </main>
    </>
  );
};