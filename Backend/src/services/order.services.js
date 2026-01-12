const prisma = require("../db/prisma");

async function placeOrder(userId, addressId) {
  return await prisma.$transaction(async (tx) => {

    const cartItems = await tx.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            price: true,
            stock: true
          }
        }
      }
    });

    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += item.product.price * item.quantity;

      if (item.quantity > item.product.stock) {
        throw new Error(`Insufficient stock for product ${item.product.id}`);
      }
    }

    const order = await tx.order.create({
        data: {
            totalAmount,

            user: {
            connect: { id: userId }
            },

            address: {
            connect: { id: addressId }
            },

            items: {
            create: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.product.price
            }))
            }
        }
    });



    for (const item of cartItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
          inStock: item.product.stock - item.quantity > 0
        }
      });
    }

    await tx.cartItem.deleteMany({
      where: { userId }
    });

    return order;
  });
}

module.exports = { placeOrder };
