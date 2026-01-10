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


const addNewAddress = async (req,res) => {
    try{
        const userId = req.user.userId
        const form = req.body

        const result = await addressServices.addNewAddress(userId,form)
        return res.status(200).json(result)

    } catch(err){
        console.log(err.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteAddress = async (req,res) => {
    try{
        const userId = req.user.userId
        const {id} = req.body;

        const result = await addressServices.deleteAddress(userId,id)
        return res.status(200).json(result)

    } catch(err){
        console.error(err.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const editAddress = async (req,res) => {
    try{
        const userId = req.user.userId
        const form = req.body;

        const result = await addressServices.editAddress(userId,form);
        return res.status(200).json(result)

    } catch(err){
        console.log(err.message)
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllAddresses,
    addNewAddress,
    deleteAddress,
    editAddress
}