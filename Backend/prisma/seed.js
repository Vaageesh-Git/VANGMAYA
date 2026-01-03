/* prisma/seed.js */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  /* ------------------ CATEGORIES ------------------ */
  const categories = [
    {
      name: "Electronics",
      slug: "electronics",
      description: "Latest gadgets, smartphones, laptops, and accessories",
      image: "/images/banners/electronics-banner.jpg",
    },
    {
      name: "Fashion",
      slug: "fashion",
      description: "Trending clothing, footwear, and accessories",
      image: "/images/banners/fashion-banner.jpg",
    },
    {
      name: "Beauty",
      slug: "beauty",
      description: "Skincare, makeup, and personal care products",
      image: "/images/banners/beauty-banner.jpg",
    },
    {
      name: "Home & Kitchen",
      slug: "home-kitchen",
      description: "Home décor, kitchen essentials, and storage",
      image: "/images/banners/home-kitchen-banner.jpg",
    },
    {
      name: "Sports & Fitness",
      slug: "sports",
      description: "Sports gear, fitness equipment, and accessories",
      image: "/images/banners/sports-banner.jpg",
    },
  ];

  const categoryMap = {};

  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    categoryMap[category.slug] = created.id;
  }

  /* ------------------ PRODUCTS ------------------ */
  const products = [
    {
      name: "iPhone 15 Pro Max",
      slug: "iphone-15-pro-max",
      description: "Apple iPhone 15 Pro Max with A17 Pro chip and titanium body.",
      shortDescription: "Apple flagship smartphone",
      brand: "Apple",
      price: 15690000,
      originalPrice: 16990000,
      discountPercent: 8,
      stock: 50,
      rating: 4.8,
      reviewCount: 12547,
      thumbnail: "/images/products/electronics/iphone-15-pro.jpg",
      badge: "Bestseller",
      categorySlug: "electronics",
    },
    {
      name: "Men's Casual T-Shirt",
      slug: "mens-casual-tshirt",
      description: "Comfortable cotton casual t-shirt for everyday wear.",
      shortDescription: "Cotton T-shirt",
      brand: "Roadster",
      price: 99900,
      originalPrice: 149900,
      discountPercent: 33,
      stock: 200,
      rating: 4.3,
      reviewCount: 8231,
      thumbnail: "/images/products/fashion/tshirt.jpg",
      badge: "Popular",
      categorySlug: "fashion",
    },
    {
      name: "Vitamin C Face Serum",
      slug: "vitamin-c-face-serum",
      description: "Brightening vitamin C serum for glowing skin.",
      shortDescription: "Skincare serum",
      brand: "Minimalist",
      price: 69900,
      originalPrice: 99900,
      discountPercent: 30,
      stock: 120,
      rating: 4.5,
      reviewCount: 5420,
      thumbnail: "/images/products/beauty/serum.jpg",
      badge: "Top Rated",
      categorySlug: "beauty",
    },
    {
      name: "Airtight Kitchen Storage Containers (Set of 6)",
      slug: "airtight-kitchen-storage-containers",
      description: "Durable airtight containers for grains and pulses.",
      shortDescription: "Kitchen storage set",
      brand: "Prestige",
      price: 129900,
      originalPrice: 199900,
      discountPercent: 35,
      stock: 80,
      rating: 4.4,
      reviewCount: 3100,
      thumbnail: "/images/products/home-kitchen/containers.jpg",
      badge: "Best Deal",
      categorySlug: "home-kitchen",
    },
    {
      name: "Adjustable Dumbbell Set",
      slug: "adjustable-dumbbell-set",
      description: "Perfect dumbbell set for home workouts and strength training.",
      shortDescription: "Fitness dumbbells",
      brand: "Boldfit",
      price: 249900,
      originalPrice: 349900,
      discountPercent: 29,
      stock: 60,
      rating: 4.6,
      reviewCount: 4120,
      thumbnail: "/images/products/sports/dumbbell.jpg",
      badge: "Fitness Essential",
      categorySlug: "sports",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        discountPercent: product.discountPercent,
        stock: product.stock,
        inStock: product.stock > 0,
        rating: product.rating,
        reviewCount: product.reviewCount,
        thumbnail: product.thumbnail,
        badge: product.badge,
        categoryId: categoryMap[product.categorySlug],
      },
    });
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
