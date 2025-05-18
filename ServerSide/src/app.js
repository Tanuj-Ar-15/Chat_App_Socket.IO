const express = require("express")
const app = express()
const os = require("os")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const cors = require("cors")

// app.use(fileUpload)

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173" , "http://localhost:5174"],
    credentials: true
}))

app.use(fileUpload())

module.exports = {app}
