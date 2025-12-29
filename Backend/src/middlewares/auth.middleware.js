function validateSignup(req,res,next){
    try{
        const {email,password,name,confirmPassword} = req.body;
        if (!email || !password || !name || !confirmPassword){
            return res.status(400).json({message : "All Fields Are Required"})
        }

        if (password !== confirmPassword){
            return res.status(400).json({message : "Password and Confirm Passwords do not match"})
        }

        next()

    } catch(err){
        return res.status(500).json({message : "Internal Server Error"})
    }
};

function validateLogin(req,res,next){
    try{
        const {email,password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message : "All Fields Are Required"})
        }

        next()

    }catch(err){
        return res.status(500).json({message : "Internal Server Error"})
    }
};

module.exports = {validateSignup, validateLogin}