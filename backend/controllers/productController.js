import { v2 as cloudinary } from 'cloudinary';
import productModel from "../models/productModel.js";

// Add product
const addProduct = async (req, res) => {
    try {
        // Destructure fields from the request body
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !sizes) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide all required fields (name, description, price, category, sizes)." 
            });
        }

        console.log("Request body:", req.body);
        console.log("Files received:", req.files);

        // Extract image files from req.files
        const imageFiles = [req.files.image1, req.files.image2, req.files.image3, req.files.image4]
            .map((fileArray) => fileArray && fileArray[0])
            .filter((file) => file); // Filter out undefined files

        console.log("Filtered image files:", imageFiles);

        // Upload images to Cloudinary and collect the URLs
        const imageUrls = await Promise.all(
            imageFiles.map(async (file) => {
                console.log(`Uploading file: ${file.path}`);
                const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        console.log("Uploaded image URLs:", imageUrls);

        // Parse the sizes JSON
        let parsedSizes;
        try {
            parsedSizes = JSON.parse(sizes);
        } catch (e) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid JSON format for sizes." 
            });
        }

        console.log("Parsed sizes:", parsedSizes);

        // Create a new product with the uploaded image URLs
        const product = new productModel({
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: parsedSizes,
            bestseller: bestseller === 'true',
            image: imageUrls,
            date: Date.now(),
        });

        console.log("Product to save:", product);

        // Save the product to the database
        await product.save();

        // Send a success response
        res.status(201).json({ 
            success: true, 
            message: "Product added successfully", 
            product 
        });
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while adding the product.", 
            error: error.message 
        });
    }
};



export default addProduct;


//list product
const listProduct = async (req, res) => {
    try {
        const products=await productModel.find({});
        return res.status(200).json({products});
    } catch (error) {
        console.log("Error : ",error.message);
        return res.status(400).send({});
    }
}

//remove product
const removeProduct = async (req, res) => {
    try {
        const product=await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({success:true,message:`product deleted ${product}`})
    } catch (error) {
        console.log("Error",error.message);
        return res.status(400).json({});
    }
}

//single product
const singleProduct = async (req, res) => {
    try {
        const {productId}=req.body;
        if (!productId) return res.status(400).json({});
        const product=await productModel.findById(productId);
        res.status(200).json({product});
    } catch (error) {
        console.log("Error",error.message);
        return res.status(400).json({});
    }
}
export { addProduct, listProduct, removeProduct, singleProduct };