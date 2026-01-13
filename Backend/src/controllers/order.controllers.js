const orderServices = require('../services/order.services');

const placeOrder = async (req,res) => {
    try{
        const userId = req.user.userId;
        const {addressId} = req.body;

        const order = await orderServices.placeOrder(userId,addressId)

        return res.status(200).json(order)
        
    } catch(err){
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllOrders = async (req,res) => {
    try{
        const userId = req.user.userId;

        const orders = await orderServices.getAllOrders(userId);
        return res.status(200).json(orders)

    } catch(err){
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getOrderDetails = async (req,res) => {
    try{
        const userId = req.user.userId;
        const { orderId } = req.params;
        const orderDetails = await orderServices.getOrderDetails(userId,orderId);
        return res.status(200).json(orderDetails)

    } catch(err){
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    placeOrder,
    getAllOrders,
    getOrderDetails
};