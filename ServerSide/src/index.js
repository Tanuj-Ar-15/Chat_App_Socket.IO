const { app } = require("./app")
const { server } = require("./lib/socket")
//  Environment Variable Configuration.
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT

// MongoDB Connection
require("./config/mongoDb")


// Initializing Controllers Api's
const requireDir = require("require-dir")
requireDir("controllers", { recurse: true })



//Listening of port
server.listen(port, () => {
    console.log("Server is running on port: " + port)
})

