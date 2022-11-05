const jwt =require("jsonwebtoken");
const User  = require('../model/userSchema')



const Authenticate = async (req, res, next)=>{
    try {

        
        const token = await req.cookies.jwtoken
        // ? Verifying token
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
       


        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token})
        console.log('This is rootuser')
        console.log(rootUser)
        if(!rootUser) {
            throw new Error('User Not Found')
        }
s
        req.token = token
        req.rootUser = rootUser // (used inside about us page) this rootUser has all the data of that specific user from DB
        req.userID = rootUser._id // (userd inside contact page)

        next();


    } catch (error) {
        res.status(401).send('Unauthorized: No token provided')
        console.log(error)
    }
}


module.exports= Authenticate

