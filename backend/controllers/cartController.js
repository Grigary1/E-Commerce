import mongoose from "mongoose";
import cartModel from "../models/cartModel.js";

export const updateCart = async (req, res) => {
    console.log("updating");
    try {
        const userId = req.user.id;
        const { productId, action } = req.body;
        if (!productId || !action) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Please login to continue"
            })
        }
        const cartItem = await cartModel.findById(productId);
        if (!cartItem) {
            console.log("item not found");
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }

        cartItem.quantity += action === "add" ? 1 : -1;
        if (cartItem.quantity < 1) {
            await cartModel.findByIdAndDelete(cartItemId);
        } else {
            await cartItem.save();
        }
        console.log("Successs");
        res.status(200).json({ success: true, message: "Quantity updated" });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const viewCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartItems = await cartModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $unwind: "$product"
            },
            {
                $addFields: {
                    variant: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: "$product.variants",
                                    as: "v",
                                    cond: { $eq: ["$$v._id", "$variantId"] }
                                }
                            },
                            0
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    quantity: 1,
                    productId: "$product._id",
                    name: "$product.title",
                    category: "$product.category",
                    image: "$product.baseImage",
                    size: "$variant.size",
                    color: "$variant.color",
                    price: "$variant.price"
                }
            }
        ]);
        if (!cartItems.length) {

            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                cartItems: []
            });
        }

        return res.status(200).json({
            success: true,
            cartItems
        });

    } catch (error) {
        console.error("Error fetching cart items:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export const addToCart = async (req, res) => {
    try {
        const { itemId, size, variantId } = req.body;
        const userId = req.user.id;
        if (!itemId) {
            return res.status(400).json({
                success: false,
                message: "Item not specified"
            })
        }
        if (!variantId) {
            return res.status(400).json({
                success: false,
                message: "Variant not specified"
            })
        }
        const result = await cartModel.updateOne({ userId, productId: itemId, variantId }, { $inc: { quantity: 1 } });
        if (result.matchedCount > 0) {
            return res.status(200).json({
                success: true,
                message: "Item added to cart"
            })
        }
        const product = new cartModel({
            userId,
            productId: itemId,
            variantId,
        })
        await product.save();
        return res.status(200).json({
            success: true,
            message: "Item added to cart"
        })
    } catch (error) {
        console.log("Error : ", error.message);
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}