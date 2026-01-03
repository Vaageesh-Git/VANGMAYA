const prisma = require("../db/prisma");

async function toggleWishlist({userId, productId}) {
    const existing = await prisma.wishlistItem.findUnique({
        where: {
            userId_productId: { userId, productId }
        }
    });

    if (existing) {
        await prisma.wishlistItem.delete({
        where: {
            userId_productId: { userId, productId }
        }
        });
        return { added: false };
    }

    await prisma.wishlistItem.create({
        data: { userId, productId }
    });

    return { added: true };

};

async function getWishlist(userId) {
    return await prisma.wishlistItem.findMany({
        where: { userId },
            include: {
            product: true
        }
    });
};

module.exports = {
    toggleWishlist,
    getWishlist
}