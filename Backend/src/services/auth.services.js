const prisma = require('../db/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;

async function signup({name,email,password}){
    const userData = await prisma.user.findUnique({
        where : {
            email
        }
    });

    if (userData){
        throw new Error("USER_ALREADY_EXISTS");
    };

    const hashedPassword = await bcrypt.hash(password,10)

    const createdUser = await prisma.user.create({
        data : {
            name,
            email,
            password : hashedPassword
        }
    })

    return {
        userId : createdUser.id,
        name : createdUser.name,
        email : createdUser.email,
    }
}

async function login({email,password}){
    const userData = await prisma.user.findUnique({
        where : {
            email
        }
    })

    if (!userData){
        throw new Error("USER_DOES_NOT_EXIST")
    }

    const isPasswordValid = await bcrypt.compare(password,userData.password);

    if (!isPasswordValid){
        throw new Error("PASSWORD_IS_INCORRECT")
    }

    const payload = {
        userId : userData.id,
        email : userData.email,
        name : userData.name
    }

    const accessToken = jwt.sign(payload,JWT_SECRET,{expiresIn : '1h'})

    return {
        accessToken
    }
};

module.exports = {
    signup,
    login
}