import { v2 as cloudinary } from 'cloudinary';
import productModel from "../models/productModel.js";

// Add product
const addProduct = async (req, res) => {
    try {
        // Destructure fields from the request body
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Extract image files from req.files
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        // Filter out undefined images
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload images to Cloudinary and collect the URLs
        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url;
            })
        )

        // Create a new product with the uploaded image URLs
        const product = new productModel({
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller: bestseller || false,
            image: imagesUrl,
            //date:new Date() // Save the array of image URLs
        });

        // Save the product to the database
        await product.save(); 
        console.log(product);

        // Send a success response
        res.status(201).json({ success: true, message: "Product added successfully", product });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, message: "try catch",error });
    }
};

export default addProduct;


//list product
const listProduct = async (req, res) => {
    return res.send("cheythitilla");
}

//remove product
const removeProduct = async (req, res) => {

}

//single product
const singleProduct = async (req, res) => {

}
export { addProduct, listProduct, removeProduct, singleProduct };