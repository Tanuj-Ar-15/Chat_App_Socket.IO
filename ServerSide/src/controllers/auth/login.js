const {loginRouter} = require("../../routes/apiRoutes")
const {userModel} = require("../../models/user.model.js")
const bcrypt = require("bcrypt")
const {generateToken} = require("../../lib/utils.js")

const logedIn =  async (req , res)=> {

const {  email , password  } = req.body;

try {
    
    if(  !email || !password ){
        return res.status(400).json({message: "All Fields are required!"})
    }

if(password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters"})
}

const existUser  = await userModel.findOne({email})
if(!existUser){
    return res.status(400).json({message: "Invalid Credentials"})
}


const isPassword = await bcrypt.compare(password , existUser.password)
if(!isPassword){
    return res.status(400).json({message: "Invalid Credentials"})
}else {
const token = await generateToken(existUser._id , res)

res.status(200).json({
    message: "Login Successfull",
    user: existUser,
    token,
    logged: true
})

}



} catch (error) {

    return res.status(500).json({ message: "Internal Server Error" });
}



}

loginRouter.post("/",logedIn )

