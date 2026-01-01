"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductClient({ product }) {
  return (
    <main className="product-page container">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link href="/">Home</Link> /{" "}
        <Link href={`/category/${product.category.slug}`}>
          {product.category.name}
        </Link>{" "}
        / <span>{product.name}</span>
      </nav>

      <div className="product-layout">
        {/* LEFT: Images */}
        <div className="product-images">
          <Image
            src={product.thumbnail}
            alt={product.name}
            width={500}
            height={500}
            priority
          />
        </div>

        {/* RIGHT: Info */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-brand">Brand: {product.brand}</p>

          <div className="product-rating">
            ⭐ {product.rating} ({product.reviewCount} reviews)
          </div>

          <div className="product-price">
            <span className="price">
              ₹{(product.price / 100).toLocaleString()}
            </span>

            {product.originalPrice && (
              <span className="original-price">
                ₹{(product.originalPrice / 100).toLocaleString()}
              </span>
            )}
          </div>

          <p className="product-stock">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          <div className="product-actions">
            <button className="btn-primary">Buy Now</button>
            <button className="btn-primary">Add to Cart</button>
            <button className="btn-secondary">Add to Wishlist</button>
          </div>

          <div className="product-description">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
