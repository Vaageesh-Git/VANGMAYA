function validateUserAndProduct(req,res,next){
    try {
        const userId = req.user.userId;
        const { productId } = req.body;
        if (!productId || !userId){
            return res.status(400).json({message : "UserId and ProductId is required"})
        }

        next()
    } catch(err){
        return res.status(500).json({message : "Internal Server Error"})
    }
};

function validateUser(req,res,next){
    try{
        const userId = req.user.userId;
        if (!userId){
            return res.status(400).json({message : "UserId is required"})
        }

        next()

    } catch(err){
        return res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports = {
    validateUserAndProduct,
    validateUser
}