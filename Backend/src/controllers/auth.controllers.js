const authServices = require('../services/auth.services');

const signup = async (req,res) => {
    const {name,email,password} = req.body;
    try{
        const user = await authServices.signup({name,email,password});
        return res.status(201).json(user)

    } catch(err){
        if (err.message === "USER_ALREADY_EXISTS") {
            return res.status(409).json({ message: "User already exists" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req,res) => {
    const {email,password} = req.body;
    try{
        const { accessToken } = await authServices.login({ email, password });

        res.cookie("access_token", accessToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", 
            maxAge: 60 * 60 * 1000 
        });

        return res.status(200).json({
            message: "Login successful"
        });
    } catch(err){
        if (err.message === "USER_DOES_NOT_EXIST" || err.message === "PASSWORD_IS_INCORRECT") {
            return res.status(401).json({ message: "Invalid Credentials"});
        }
        console.log(err.message)
        return res.status(500).json({ message: "Internal Server Error" });

    }
}

module.exports = {
    signup,
    login
}