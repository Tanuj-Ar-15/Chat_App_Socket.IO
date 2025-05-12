const { text } = require("express")
const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String
    },
    image: {
        type: String
    }
} , {timestamps: true})

messageSchema.index({text: 1})

const messageModel =  mongoose.model("message" , messageSchema)


module.exports = {messageModel}
