const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
    ,
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: ""
    }
} ,  {timestamps: true} )

const userModel = mongoose.model("User" , userSchema)

module.exports = {userModel}
