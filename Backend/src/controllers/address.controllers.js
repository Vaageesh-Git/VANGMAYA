const addressServices = require('../services/address.services');

const getAllAddresses = async (req,res) => {
    try{
        const userId = req.user.userId;

        const result = await addressServices.getAllAddresses(userId)

        return res.status(200).json(result)
    } catch{
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllAddresses
}