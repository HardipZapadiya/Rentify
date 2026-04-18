const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const testCloudinary = async () => {
  try {
    const result = await cloudinary.uploader.upload('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', {
      folder: 'rentify_test'
    });
    console.log('Cloudinary upload successful:', result.secure_url);
  } catch (err) {
    console.error('Cloudinary upload failed:', err);
  } finally {
    process.exit();
  }
};

testCloudinary();
