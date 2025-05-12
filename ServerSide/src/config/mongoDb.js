const mongoose = require("mongoose")

const connectMongo =  async ()=> {
    try {
        await   mongoose.connect("mongodb://localhost:27017/chat_db")

        console.log("Database Connection Successfull");
        
    } catch (error) {
        console.log(error);
        
    }
}

connectMongo()
