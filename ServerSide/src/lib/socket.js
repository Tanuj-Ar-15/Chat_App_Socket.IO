const { app } = require("../app")
const { Server } = require("socket.io")
const http = require("http")

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

const onlineUserId = {};

const getRecieverSocketId = (userId) => {
    return onlineUserId[userId]
}
io.on("connect", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId



    if (userId) {
        onlineUserId[userId] = socket.id
        io.emit("onlineUser", Object.keys(onlineUserId))
    }

    socket.on("disconnect", () => {
        delete onlineUserId[userId]
        io.emit("onlineUser", Object.keys(onlineUserId))
        console.log("A user is disconnected.");

    })

})


module.exports = { io, server, getRecieverSocketId }