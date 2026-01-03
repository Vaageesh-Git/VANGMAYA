const wishlistService = require('../services/wishlist.services');

const toggleWishlist = async (req,res) => {
    try{
        const result = await wishlistService.toggleWishlist(userId, productId);
        return res.status(200).json(result);
    } catch(err){
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const items = await wishlistService.getWishlist(userId);
        return res.status(200).json(items);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {
    toggleWishlist,
    getWishlist
}