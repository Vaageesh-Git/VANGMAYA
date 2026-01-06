const cartServices = require('../services/cart.services');

const getCart = async (req,res) => {
    try{
        const userId = req.user.userId;
        const result = await cartServices.getCart(userId);
        return res.status(200).json(result)

    } catch(err){
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const addToCart = async (req,res) => {
    try {
        const userId = req.user.userId;
        const {productId} = req.body;
        const result = await cartServices.addToCart(userId,productId)
        return res.status(200).json(result)

    } catch(err){
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const removeFromCart = async (req,res) => {
    try{
        const userId = req.user.userId;
        const {productId} = req.body;
        const result = await cartServices.removeFromCart(userId,productId)
        return res.status(200).json(result)

    } catch(err){
        console.log(err.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateCartQuantity = async (req,res) => {
    try {
        const userId = req.user.userId;
        const {productId,quantity} = req.body;
        const result = await cartServices.updateCartQuantity(userId,productId,quantity)
        return res.status(200).json(result)

    } catch(err){
        console.log(err.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports ={
    getCart,
    addToCart,
    removeFromCart,
    updateCartQuantity
};