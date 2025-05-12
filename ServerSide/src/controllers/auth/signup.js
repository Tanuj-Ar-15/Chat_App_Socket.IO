const {signupRouter} = require("../../routes/apiRoutes")
const {userModel} = require("../../models/user.model.js")
const bcrypt = require("bcrypt")
const {generateToken} = require("../../lib/utils.js")

const signUp =  async (req , res)=> {

const { fullName , email , password  } = req.body;

try {
    
    if(!fullName ||  !email || !password ){
        return res.status(400).json({message: "All Fields are required!"})
    }

if(password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters"})
}

const existUser  = await userModel.findOne({email})
if(existUser){
    return res.status(400).json({message: "Email Already Exists"})
}
const saltRounds = await bcrypt.genSalt(10)
const bcryptPass = await bcrypt.hash(password , saltRounds)

const newUser = await new userModel({fullName , email , password: bcryptPass })

await newUser.save()

if(newUser){
 const generatedToken = await generateToken(newUser._id , res)



    return res.status(201).json({message: "User Created Successfully" , user: newUser , token: generatedToken })
}else {
    return res.status(400).json({message: "Invalid User Data" })
}



} catch (error) {

    return res.status(500).json({ message: "Internal Server Error" });
}



}

signupRouter.post("/", signUp)

