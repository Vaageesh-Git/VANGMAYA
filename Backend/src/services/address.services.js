const prisma = require("../db/prisma");

async function getAllAddresses(userId) {
    return await prisma.address.findMany({
        where : {
            userId
        }
    })
};

module.exports = {
    getAllAddresses
}