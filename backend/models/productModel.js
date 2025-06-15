import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  size: {
    type: String,
    required: true,
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
})

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, default: "Generic" },
  tags: { type: [String], default: [] },
  baseImage: { type: String, required: true },
  images: { type: [String], default: [] },
  variants: { type: [variantSchema], default: [] },
  isBestSeller: { type: Boolean, default: false }

}, { timestamps: true })

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;