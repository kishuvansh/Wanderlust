const cloudinaryRoot = require('cloudinary');
const cloudinary = cloudinaryRoot.v2;
const CloudinaryStorageModule = require('multer-storage-cloudinary');
const CloudinaryStorage = CloudinaryStorageModule.CloudinaryStorage || CloudinaryStorageModule;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_secret
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryRoot,
  params: {
    folder: 'wanderlust_DEV',
    allowed_formats: ['jpg', 'png', 'jpeg'], // supports promises as well

  },
});

module.exports = {
  cloudinary,
  storage,
};