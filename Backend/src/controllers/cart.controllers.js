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

module.exports ={
    getCart
}