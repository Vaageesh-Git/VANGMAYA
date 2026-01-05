const prisma = require("../db/prisma");

async function getCart(userId) {
    return await prisma.cartItem.findMany({
        where : {
            userId
        },
        include : {
            product : true,
        }
    })
};

async function addToCart(userId, productId) {
    return prisma.cartItem.upsert({
        where: {
            userId_productId: {
                userId,
                productId
            }
        },
        update: {
            quantity: {
                increment: 1
            }
        },
        create: {
            userId,
            productId,
            quantity: 1
        }
    });
};


module.exports = {
    getCart,
    addToCart
};