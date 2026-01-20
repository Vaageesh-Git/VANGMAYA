const prisma = require("../db/prisma");

async function searchProductByQuery(query) {
  return await prisma.product.findMany({
    where: {
      isActive: true,
      inStock: true,
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          brand: {
            contains: query,
          },
        },
        {
          shortDescription: {
            contains: query,
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      thumbnail: true,
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    take: 8,
  });
};


module.exports = {
    searchProductByQuery
}