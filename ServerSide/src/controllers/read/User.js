const { readUser } = require("../../routes/apiRoutes")
const { protectRoute } = require("../../middleware/auth.middleware.js")

const readuser = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        return res.status(400).json("Error in Read Api.")
    }
}


readUser.get("/",protectRoute , readuser)
