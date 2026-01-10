const prisma = require("../db/prisma");

async function getAllAddresses(userId) {
    return await prisma.address.findMany({
        where : {
            userId
        }
    })
};


async function addNewAddress(userId, form) {
  return prisma.address.create({
    data: {
      userId,
      ...form
    }
  });
};

async function deleteAddress(userId, id) {
    return await prisma.address.delete({
        where : {
            userId,
            id
        }
    });
};

async function editAddress(userId,form) {
    return await prisma.address.update({
        where : {
            userId,
            id : form.id
        },
        data : {
            ...form
        }
    })
};

module.exports = {
    getAllAddresses,
    addNewAddress,
    deleteAddress,
    editAddress
}