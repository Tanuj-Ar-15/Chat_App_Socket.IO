const { app } = require("../app")
const { Server } = require("socket.io")
const http = require("http")

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on("connect", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("disconnect", () => {
        console.log("A user is disconnected.");

    })

})


module.exports = { io, server }