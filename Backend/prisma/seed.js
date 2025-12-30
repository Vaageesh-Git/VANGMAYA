import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  /* ------------------ CATEGORIES ------------------ */
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Electronics",
        slug: "electronics",
        description: "Smartphones, laptops, gadgets and more",
        image: "/images/banners/electronics-banner.jpg",
      },
      {
        name: "Fashion",
        slug: "fashion",
        description: "Latest fashion and accessories",
        image: "/images/banners/fashion-banner.jpg",
      },
      {
        name: "Home & Living",
        slug: "home-living",
        description: "Furniture, decor and essentials",
        image: "/images/banners/home-living-banner.jpg",
      },
      {
        name: "Beauty",
        slug: "beauty",
        description: "Skincare, makeup and personal care",
        image: "/images/banners/beauty-banner.jpg",
      },
      {
        name: "Sports",
        slug: "sports",
        description: "Sports and fitness essentials",
        image: "/images/banners/sports-banner.jpg",
      },
    ],
  });

  console.log("✅ Categories seeded");

  /* Fetch category IDs */
  const electronics = await prisma.category.findUnique({
    where: { slug: "electronics" },
  });

  /* ------------------ PRODUCTS ------------------ */
  const iphone = await prisma.product.create({
    data: {
      name: "iPhone 15 Pro Max",
      slug: "iphone-15-pro-max",
      description:
        "The iPhone 15 Pro Max features a titanium design, A17 Pro chip, and advanced camera system.",
      shortDescription: "Apple iPhone 15 Pro Max with A17 Pro chip",
      brand: "Apple",
      price: 15690000, // paise
      originalPrice: 16990000,
      discountPercent: 8,
      stock: 25,
      inStock: true,
      rating: 4.8,
      reviewCount: 12547,
      badge: "Bestseller",
      thumbnail: "/images/products/electronics/iphone-15-pro.jpg",
      categoryId: electronics.id,
      images: {
        create: [
          { url: "/images/products/electronics/iphone-15-pro.jpg" },
          { url: "/images/products/electronics/iphone-15-pro-back.jpg" },
        ],
      },
      metaTitle: "iPhone 15 Pro Max Price in India | VANGMAYA",
      metaDescription:
        "Buy iPhone 15 Pro Max online at best price with fast delivery.",
    },
  });

  const sonyHeadphones = await prisma.product.create({
    data: {
      name: "Sony WH-1000XM5 Wireless Headphones",
      slug: "sony-wh-1000xm5-headphones",
      description:
        "Industry-leading noise cancellation with premium sound quality.",
      shortDescription: "Sony wireless noise cancelling headphones",
      brand: "Sony",
      price: 2699000,
      originalPrice: 3499000,
      discountPercent: 23,
      stock: 40,
      inStock: true,
      rating: 4.9,
      reviewCount: 6721,
      badge: "Best Deal",
      thumbnail: "/images/products/electronics/sony-headphones.jpg",
      categoryId: electronics.id,
      images: {
        create: [
          { url: "/images/products/electronics/sony-headphones.jpg" },
        ],
      },
      metaTitle: "Sony WH-1000XM5 Headphones | VANGMAYA",
      metaDescription:
        "Buy Sony WH-1000XM5 noise cancelling headphones online.",
    },
  });

  console.log("✅ Products seeded");

  console.log("🌱 Seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
