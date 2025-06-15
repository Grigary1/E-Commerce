import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

export const bestSellers=async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const bestsellers=await productModel.find({},{
            title: 1,
            baseImage: 1,
            'variants.0.price': 1
        })
    } catch (error) {
        
    }
}

export const latestCollections = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const collections = await productModel.find({}, {
            title: 1,
            baseImage: 1,
            'variants.0.price': 1
        }).sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        if (!collections.length) {
            return res.status(200).json({
                success: false,
                message: "Reached End"
            });
        }
        return res.status(200).json({
            success: true,
            latestCollections: collections
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}


export const productDetails = async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        const product = await productModel.findById(id, {
            title: 1,
            description: 1,
            category: 1,
            brand: 1,
            baseImage: 1,
            images: 1,
            'variants.size': 1,
            'variants.color': 1,
            'variants.price': 1,
            'variants.stock': 1,
            'variants._id': 1
        }).lean();
        return res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        console.log("error");
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
}


export const addProduct = async (req, res) => {
    try {
        const { sellerId, title, description, category, brand, tags, variants } = req.body;

        if (!title || !description || !category || !req.files['baseImage']) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, description and category",
            });
        }
        const tagArray = Array.isArray(tags) ? tags : (JSON.parse(tags) || []);
        let variantArray;
        try {
            variantArray = JSON.parse(variants);
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Invalid JSON for variants",
            });
        }

        const enrichedVariants = variantArray.map((item) => ({
            sku: item.sku,
            size: item.size,
            color: item.color,
            price: item.price,
            stock: item.stock || 0,
        }));

        let baseImageUrl = "";
        if (req.files.baseImage && req.files.baseImage[0]) {
            const file = req.files.baseImage[0];
            const result = await cloudinary.uploader.upload(file.path, { resource_type: "image" });
            baseImageUrl = result.secure_url;
        } else {
            return res.status(400).json({
                success: false,
                message: "Missing baseImage file",
            });
        }

        const ImageFiles = ['image2', 'image3', 'image4']
            .map(name => req.files[name]?.[0])
            .filter(Boolean);

        const uploadResults = await Promise.all(
            ImageFiles.map(file =>
                cloudinary.uploader.upload(file.path, { resource_type: 'image' })
            )
        );
        const extraImageUrls = uploadResults.map(r => r.secure_url);

        // now build the product with plain-String URLs:
        const product = new productModel({
            seller: sellerId,
            title,
            description,
            category,
            brand: brand || "Generic",
            tags: tagArray,
            baseImage: baseImageUrl,     // use the URL you extracted
            images: extraImageUrls,    // an array of strings
            variants: enrichedVariants,
        });
        await product.save();

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        console.error("Error in addProduct:", error);
        return res.status(500).json({
            success: false,
            message: "Server error adding product",
            error: error.message,
        });
    }
};


export default addProduct;


//list product
const listProduct = async (req, res) => {
    try {
        const q = req.query.q?.trim() || null;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const query = q ? {
            name: {
                $regex: q, $options: 'i'
            }
        } : {};
        const skip = (page - 1) * limit;

        const [products, totalProducts] = await Promise.all([
            productModel.aggregate([
                { $match: query },
                {
                    $project: {
                        _id: 1,
                        name: "$title",
                        image: "$baseImage",
                        price: { $arrayElemAt: ["$variants.price", 0] }
                    }
                },
                { $skip: skip },
                { $limit: limit }
            ]),
            productModel.countDocuments(query)
        ]);
        const result = res.json({
            success: true,
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page
        });
        console.log("result", result);
        return result
    } catch (error) {
        console.log("Error : ", error.message);
        return res.status(400).send({});
    }
}

//remove product
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: `product deleted ${product}` })
    } catch (error) {
        console.log("Error", error.message);
        return res.status(400).json({});
    }
}

//single product
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) return res.status(400).json({});
        const product = await productModel.findById(productId);
        res.status(200).json({ product });
    } catch (error) {
        console.log("Error", error.message);
        return res.status(400).json({});
    }
}
export { listProduct, removeProduct, singleProduct };