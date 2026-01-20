const prisma = require("../db/prisma");

async function searchProductByQuery(query) {
  if (!query || !query.trim()) return [];

  const q = query.toLowerCase().replace(/[\s-]/g, "");

  return await prisma.product.findMany({
    where: {
      isActive: true,
      inStock: true,
      searchKey: {
        contains: q,
      },
    },
    take: 8,
  });
}


module.exports = {
    searchProductByQuery
}