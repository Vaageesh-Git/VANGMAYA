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

module.exports = {
    getCart
}