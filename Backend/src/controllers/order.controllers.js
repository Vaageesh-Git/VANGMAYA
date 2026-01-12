const orderServices = require('../services/order.services');

const placeOrder = async (req,res) => {
    try{
        const userId = req.user.userId;
        const {addressId} = req.body;
        console.log(addressId)

        const order = await orderServices.placeOrder(userId,addressId)


        return res.status(200).json(order)
        
    } catch(err){
        console.log(err.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    placeOrder
}