import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const variantSchema = new Schema({
    size: { type: String, required: true },
    color: { type: String },
}, { _id: false });

// product item in the order
const productItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    variant: variantSchema,
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
}, { _id: false });

// customer info
const customerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    phone: { type: String, required: true },
}, { _id: false });

// address
const addressSchema = new Schema({
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
}, { _id: false });

// payment info
const paymentDetailsSchema = new Schema({
    paymentMethod: {
        type: String,
        required: true,
        enum: ['razorpay', 'cod'],
    },
    cardNumber: { type: String },
    expiryDate: { type: String },
    cvv: { type: String },
}, { _id: false });

// order schema
const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    customer: { type: customerSchema, required: true },
    shippingAddress: { type: addressSchema, required: true },
    billingAddress: { type: addressSchema, required: true },
    items: { type: [productItemSchema], required: true },
    paymentDetails: { type: paymentDetailsSchema, required: true },
    shippingMethod: {
        type: String,
        required: true,
        enum: ['standard', 'express', 'weekend', 'late'],
    },
    orderNotes: { type: String },
    orderStatus: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'shipped', 'delivered'],
        default: 'pending',
    },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    estimatedDelivery: { type: Date },
}, { timestamps: true });

// Pre-save hook to calculate estimatedDelivery
orderSchema.pre('save', function (next) {
    const order = this;

    // Add 5 days to the order date
    const deliveryDate = new Date(order.createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    const day = deliveryDate.getDay(); // 0 = Sunday, 6 = Saturday

    if (order.shippingMethod === 'standard' && (day === 0 || day === 6)) {
        // Shift to Monday if falls on weekend
        const offset = day === 6 ? 2 : 1;
        deliveryDate.setDate(deliveryDate.getDate() + offset);
    }

    order.estimatedDelivery = deliveryDate;
    next();
});

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default orderModel;
