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

module.exports = {
    validateSlug
}