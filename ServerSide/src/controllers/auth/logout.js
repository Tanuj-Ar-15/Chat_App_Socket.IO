const {logoutRouter} = require("../../routes/apiRoutes")

const loggedOut =  async (req , res)=> {

try {
    res.cookie("jwt" , "" , {
        maxAge: 0
    })

    return res.status(200).json({message: "Logged Out Success!" , loggedout: true})

} catch (error) {
    return res.status(400).json({message: "Internal Server Error"})
}


}

logoutRouter.get("/", loggedOut)

