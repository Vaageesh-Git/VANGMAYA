function validateSlug(req,res,next) {
    try{
        const { slug } = req.params;
        if (!slug){
            return res.status(400).json({ message: "Slug is required" });
        }
        next()
    } catch(err){
        return res.status(500).json({message : "Internal Server Error"})
    }
};

function validateCategorySlug(req,res,next){
    try{
        const { category } = req.query;
        if (!category) {
            // return res.status(400).json({message: "Category query param is required"});
            return next()
        }

        if (typeof category !== 'string' || category.trim() === '') {
            return res
                .status(400)
                .json({ message: "Invalid category query param" });
        }

        next()
    } catch(err){
        return res.status(500).json({message : "Internal Server Error"})
    }
}

function validateProductIds(req,res,next){
    try{
        const {ids} = req.body;

        if (!ids){
            return res.status(400).json({message : "Product id's are required"})
        }

        next()
    } catch(err){
        return res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports = {
    validateSlug,
    validateCategorySlug,
    validateProductIds
}