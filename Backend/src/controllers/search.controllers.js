const searchServices = require('../services/search.services');

const searchProductByQuery = async (req,res) => {
    try{
        const {searchQuery} = req.query;
        const products = await searchServices.searchProductByQuery(searchQuery)

        return res.status(200).json(products)
    } catch(err){
        console.log(err.message)
        return res.status(500).json({message : "Internal Server Error"})
    }
};

module.exports = {
    searchProductByQuery
}