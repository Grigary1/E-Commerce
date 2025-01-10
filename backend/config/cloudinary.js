import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME, // Set your Cloudinary cloud name
        api_key: process.env.CLOUDINARY_API_KEY,       // Set your Cloudinary API key
        api_secret: process.env.CLOUDINARY_API_SECRET, // Set your Cloudinary API secret
        secure: true                                   // Enable secure delivery of assets
    });

    console.log("Cloudinary Config: ", cloudinary.config());
};

export default connectCloudinary;
