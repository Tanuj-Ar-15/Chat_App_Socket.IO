const { sideUsers, getMessages, createMessage } = require("../routes/apiRoutes.js");
const { protectRoute } = require("../middleware/auth.middleware.js");
const { userModel } = require("../models/user.model.js");
const { messageModel } = require("../models/message.model.js");
const cloudinary = require("cloudinary").v2;

const sidebarUsers = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filteredUsers = await userModel.find({ _id: { $ne: loggedUserId } });
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error);
  }
};

const getUserMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedUserId = req.user._id;
    const filteredMessages = await messageModel.find({
      $or: [
        { senderId: id, recieverId: loggedUserId },
        { recieverId: id, senderId: loggedUserId }
      ]
    });
    res.status(200).json(filteredMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body
    const senderId = req.user._id
    const { id: recieverId } = req.params

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new messageModel({
      senderId,
      recieverId,
      text,
      image: imageUrl
    });


    await newMessage.save()
    //todo: realtime functionality with socket.io will be here
    res.json({
      newMessage
    })

  } catch (error) {
    console.log(error);

  }
}


sideUsers.get("/", protectRoute, sidebarUsers);
getMessages.get("/", protectRoute, getUserMessages)
createMessage.post("/", protectRoute, sendMessage)
