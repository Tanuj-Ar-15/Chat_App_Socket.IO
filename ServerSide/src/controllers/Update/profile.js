const { updateRouter } = require("../../routes/apiRoutes");
const { protectRoute } = require("../../middleware/auth.middleware.js");
const { uploadProfilePic } = require("../../lib/cloudinary.js");
const { userModel } = require("../../models/user.model");

const updateProfile = async (req, res) => {
  const { profilePic } = req.files;


  try {
    const id = req.user._id; // Only the base64 string after the comma

    const secureUrl = await uploadProfilePic(profilePic.data);
    const updateProfile = await userModel.findByIdAndUpdate(
      { _id: id },
      { profilePic: secureUrl },
      { new: true }
    );

    
    res.status(200).json(updateProfile);
  } catch (error) {
    console.log(error);
  }
};

updateRouter.put("/profile", protectRoute, updateProfile);
