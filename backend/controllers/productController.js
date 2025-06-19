import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
import orderModel from '../models/orderModel.js';
import puppeteer from 'puppeteer';
import mongoose from 'mongoose';

const generateInvoiceHTML = (order) => {
    try {
        const {
            _id,
            shippingMethod,
            estimatedDelivery,
            createdAt,
            shippingAddress,
            billingAddress,
            paymentDetails,
            totalAmount,
            items
        } = order;

        const dateStr = new Date(createdAt).toLocaleDateString('en-IN');
        const deliveryDate = new Date(estimatedDelivery).toLocaleDateString('en-IN');

        const itemsHTML = items.map((item, idx) => {
            const total = (item.price * item.quantity).toFixed(2);
            return `
          <tr>
            <td class="center">${idx + 1}</td>
            <td class="left strong">${item.productInfo.name}</td>
            <td class="left">Category: ${item.productInfo.category} | Size: ${item.variant.size}</td>
            <td class="right">₹${item.price.toFixed(2)}</td>
            <td class="center">${item.quantity}</td>
            <td class="right">₹${total}</td>
          </tr>
        `;
        }).join('');

        return `
      <html>
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" />
          <style>
            body { font-family: 'Arial'; padding: 40px; }
            .text-dark { color: #0e7490 !important; }
            table th { background-color: #0e7490; color: white; }
            .logo { max-width: 100px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="card-header p-4">
                <h3 class="mb-0">Invoice #${_id}</h3>
                <small>Issued on: ${dateStr}</small>
              </div>
              <div class="card-body">
                <div class="row mb-4">
                  <div class="col-sm-6">
                    <h5 class="mb-3">From:</h5>
                    <h3 class="text-dark mb-1">GCart Store</h3>
                    <div>29, Store Lane</div>
                    <div>New Delhi, India</div>
                    <div>Email: support@gcart.com</div>
                    <div>Phone: +91 1800-123-4567</div>
                  </div>
                  <div class="col-sm-6">
                    <h5 class="mb-3">To:</h5>
                    <h3 class="text-dark mb-1">Customer</h3>
                    <div>${shippingAddress.addressLine1}</div>
                    <div>${shippingAddress.addressLine2 || ''}</div>
                    <div>${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}</div>
                  </div>
                </div>
    
                <div class="table-responsive-sm">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th class="center">#</th>
                        <th>Item</th>
                        <th>Description</th>
                        <th class="right">Price</th>
                        <th class="center">Qty</th>
                        <th class="right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHTML}
                    </tbody>
                  </table>
                </div>
    
                <div class="row">
                  <div class="col-lg-4 col-sm-5"></div>
                  <div class="col-lg-4 col-sm-5 ml-auto">
                    <table class="table table-clear">
                      <tbody>
                        <tr>
                          <td class="left"><strong class="text-dark">Payment Method</strong></td>
                          <td class="right">${paymentDetails.toUpperCase()}</td>
                        </tr>
                        <tr>
                          <td class="left"><strong class="text-dark">Shipping Method</strong></td>
                          <td class="right">${shippingMethod.toUpperCase()}</td>
                        </tr>
                        <tr>
                          <td class="left"><strong class="text-dark">Expected Delivery</strong></td>
                          <td class="right">${deliveryDate}</td>
                        </tr>
                        <tr>
                          <td class="left"><strong class="text-dark">Total</strong></td>
                          <td class="right"><strong class="text-dark">₹${totalAmount.toFixed(2)}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="card-footer bg-white text-center">
                <p class="mb-0">Thanks for shopping with GCart!</p>
              </div>
            </div>
          </div>
        </body>
      </html>
      `;
    } catch (error) {
        console.log("Error : ", error.message);
    }

};


export const downloadInvoice = async (req, res) => {
    try {
        const { invoiceId } = req.query;
        const order = await orderModel.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(invoiceId) }
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

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const invoiceHTML = generateInvoiceHTML(order);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(invoiceHTML, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="invoice-${invoiceId}.pdf"`);
        res.send(pdfBuffer);

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const brand = async (req, res) => {
    console.log("Reached brand")
    try {
        const brands = await productModel.distinct('brand');
        return res.status(200).json({
            success: true,
            brands,
        });

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};



export const trending = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const q = req.query.q?.trim() || '';

        const filter = {};
        if (q) filter.category = q;


        const trendingProducts = await productModel.aggregate([
            { $match: filter },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    title: 1,
                    baseImage: 1,
                    description: 1,
                    price: { $arrayElemAt: ['$variants.price', 0] }
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            trending: trendingProducts,
        });

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


export const bestSellers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const bestsellers = await productModel.find({}, {
            title: 1,
            baseImage: 1,
            'variants.0.price': 1
        })
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
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