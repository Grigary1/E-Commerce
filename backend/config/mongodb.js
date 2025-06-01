import mongoose from 'mongoose'

const connectDB = async () => {

    mongoose.connection.on("connected", () => {
        console.log("DB Connected");
    })
    try {
        console.log("env : ",process.env.MONGODB_URL)
        await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);
    } catch (error) {
        console.log("env : ",process.env.MONGODB_URL)
        console.log("Failed to connect : ",error.message);
    }
}
export default connectDB;