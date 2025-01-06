        import mongoose from 'mongoose'

        const connectDB=async()=>{
            
            mongoose.connection.on("connected",()=>{
                console.log("DB Connected");
            })
            try{
            await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);
            }catch(error){
                console.log("Failed to connect");
            }
        }
        export default connectDB;