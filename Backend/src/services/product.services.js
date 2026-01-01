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

module.exports = {
    getProductBySlug
}
