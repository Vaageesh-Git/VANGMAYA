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

async function removeFromCart(userId,productId) {
    return await prisma.cartItem.delete({
        where: {
            userId_productId: {
                userId,
                productId
            }
        }
    });
};

async function updateCartQuantity(userId,productId,quantity) {
    return prisma.cartItem.update({
        where: {
            userId_productId: {
                userId,
                productId
            }
        },
        data: {
            quantity
        }
    });
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    updateCartQuantity
};