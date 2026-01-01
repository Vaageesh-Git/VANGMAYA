const prisma = require('../db/prisma');

async function getProductBySlug({slug}){
    return await prisma.product.findUnique({
        where : {
            slug
        },
        include : {
            images : true,
            category : true
        }
    })
};

async function getProductsByCategory(categorySlug) {
  return await prisma.product.findMany({
    where: {
      isActive: true,
      category: {
        slug: categorySlug
      }
    },
    include: {
      images: true,
      category: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

module.exports = {
    getProductBySlug,
    getProductsByCategory
};