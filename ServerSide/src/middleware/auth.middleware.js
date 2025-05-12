const jwt  = require("jsonwebtoken")
const {userModel} = require("../models/user.model.js")

const protectRoute = async (req , res , next)=> {
    try {
        
const token = req.cookies.jwt

if(!token){
    return res.status(401).json({message : "Please login to access this route"})
}

const decoded = jwt.verify(token , process.env.JWT_SECRET)
if(!decoded){
    return res.status(401).json({message : "Unathorized Token"})
}

const user = await userModel.findById(decoded.userId).select("-password")


req.user = user

next()

    } catch (error) {
       console.log(error);
        
    }
}

module.exports = {protectRoute}
