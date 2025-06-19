// controllers/orderController.js

import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";

export const viewOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await orderModel.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }
            },
            {
                $unwind: "$items"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            {
                $unwind: "$productDetails"
            },
            {
                $group: {
                    _id: "$_id",
                    orderStatus: { $first: "$orderStatus" },
                    shippingMethod: { $first: "$shippingMethod" },
                    estimatedDelivery: { $first: "$estimatedDelivery" },
                    createdAt: { $first: "$createdAt" },
                    shippingAddress: { $first: "$shippingAddress" },
                    billingAddress: { $first: "$billingAddress" },
                    paymentDetails: { $first: "$paymentDetails.paymentMethod" },
                    totalAmount: { $first: "$totalAmount" },
                    items: {
                        $push: {
                            productId: "$items.productId",
                            quantity: "$items.quantity",
                            price: "$items.price",
                            variant: "$items.variant",
                            productInfo: {
                                name: "$productDetails.title",
                                image: "$productDetails.baseImage",
                                category: "$productDetails.category"
                            }
                        }
                    }
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);

        if (orders.length === 0) {
            return res.status(200).json({
                success: false,
                message: "Your order list is empty"
            });
        }

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.log("Error : ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            customer,
            shippingAddress,
            billingAddress,
            items,
            paymentDetails,
            shippingMethod,
            orderNotes,
            totalAmount,
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Order must include at least one item' });
        }

        const order = new orderModel({
            userId,
            customer,
            shippingAddress,
            billingAddress,
            items,
            paymentDetails,
            shippingMethod,
            orderNotes,
            totalAmount,
        });

        await order.save();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            orderId: order._id,
            estimatedDelivery: order.estimatedDelivery,
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, message: 'Server error placing order' });
    }
};