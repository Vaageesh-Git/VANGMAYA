const wishlistService = require('../services/wishlist.services');

const toggleWishlist = async (req,res) => {
    const userId = req.user.userId;
    const { productId } = req.body;
    try{
        const result = await wishlistService.toggleWishlist(userId, productId);
        return res.status(200).json(result);
    } catch(err){
        console.log(err.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getWishlist = async (req, res) => {
    try {
        const userId = req.user.userId;
        const items = await wishlistService.getWishlist(userId);
        return res.status(200).json(items);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getWishlistIds = async (req, res) => {
  try {
    const userId = req.user.userId;
    const ids = await wishlistService.getWishlistIds(userId);
    return res.status(200).json(ids);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to fetch wishlist ids' });
  }
};

module.exports = {
    toggleWishlist,
    getWishlist,
    getWishlistIds
}