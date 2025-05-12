const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadProfilePic = fileBuffer => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "profile_pics" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url); // Return secure_url
        }
      }
    );
    stream.end(fileBuffer); // Send file buffer
  });
};

module.exports = { uploadProfilePic };
