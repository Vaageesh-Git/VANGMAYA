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

const getProductsByCategory = async (req,res) => {
    try {
        const { category } = req.query;
        const products = category
            ? await productServices.getProductsByCategory(category)
            : await productServices.getAllProducts();
        return res.status(200).json(products);
    } catch(err){
        return res.status(500).json({message : "Internal Server Error"})
    }
};

const getProductsByIds = async (req, res) => {
  const { ids } = req.body;
  try{
    const products = await productServices.getProductsByIds(ids);
    return res.json(products);

  } catch(err){
    return res.status(500).json({message : "Internal Server Error"})
  }
};

const getFeaturedProducts = async(req,res) => {
    try{
        const products = await productServices.getFeaturedProducts();
        return res.json(products)
    } catch(err){
        return res.status(500).json({message : "Internal Server Error"})
    }
}


module.exports = {
    getProductBySlug,
    getProductsByCategory,
    getProductsByIds,
    getFeaturedProducts
}