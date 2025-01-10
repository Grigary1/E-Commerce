import jwr from 'jsonwebtoken';

const adminAuth=async (req,res,next) => {
    try {
        const {token}=req.headers;
        if (!token) return res.json({success:false,message:"Not authorised"});
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        if (token_decode!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) return res.json({success:false,message:"Not authorised"});
        next();
    } catch (error) {
        console.log("Error");
        return res.status(400);
    }
}
export default adminAuth;