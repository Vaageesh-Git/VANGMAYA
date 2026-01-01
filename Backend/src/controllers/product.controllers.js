const productServices = require('../services/product.services');

const getProductBySlug = async (req,res) => {
    try {
        const { slug } = req.params;
        const product = await productServices.getProductBySlug({slug});

        if (!product){
            return res.status(404).json({message : "Product Not Found."})
        }

        return res.status(200).json(product)

    } catch(err){
        return res.status(500).json({message : "Internal Server Error"})
    }
};

module.exports = {
    getProductBySlug
}