'use client'
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useRouter } from "next/navigation";


export default function ProductClient({ product }) {
  const router = useRouter();
  const { wishlistIds, toggleWishlist } = useWishlist();
  const {addToCart,increment,decrement,getQuantity,cartLoaded} = useCart();
  const isWishlisted = wishlistIds.includes(product.id);
  const quantity = getQuantity(product.id);

  const handleBuyNow = async () => {
    if (!cartLoaded) return;

    if (quantity > 0) {
      router.push("/checkout");
      return;
    }

    await addToCart(product.id, 1);
    router.push("/checkout");
  };

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
            <button
              className="btn-primary"
              onClick={handleBuyNow}
              disabled={!cartLoaded}
            >
              Buy Now
            </button>

            {quantity === 0 ? (
              <button
                className="btn-primary"
                onClick={() => addToCart(product.id, 1)}
                disabled={!cartLoaded}
              >
                Add to Cart
              </button>
            ) : (
              <div className="quantity-bar">
                <button onClick={() => decrement(product.id)}>−</button>
                <span>{quantity}</span>
                <button onClick={() => increment(product.id)}>+</button>
              </div>
            )}


            <button
              className={`btn-secondary wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
            >
              {isWishlisted ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
            </button>
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
