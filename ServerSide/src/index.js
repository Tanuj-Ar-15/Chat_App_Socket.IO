const {app} = require("./app")

//  Environment Variable Configuration.
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT

// MongoDB Connection
require("./config/mongoDb")


// Initializing Controllers Api's
const requireDir = require("require-dir")
requireDir("controllers" , {recurse: true})

//Listening of port
app.listen(port , ()=> {
    console.log("Server is running on port: " + port)
})

