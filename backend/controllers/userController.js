import userModel from "../models/userModel.js";
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken'
import validator from 'validator'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req, res) => {
    try {
        const {email,password}=req.body;
        const data=await userModel.findOne({email});
        if(!data){
            return res.status(404).json({success:false,message:"User does not exists"});
        }
        const storedPassword=data.password;
        const match=await bcrypt.compare(password,storedPassword);
        if (match){
            return res.status(200).json({success:true,message:"Authentication success"});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:error});
    }
};

const registerUser = async (req, res) => {
    try {
        const {name,email,password}=req.body;
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"});
        }
        //validating
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid email"});
        }
        if(password.length<6){
            return res.json({success:false,message:"Enter strong password"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new userModel({
            name:this.name,
            email:this.email,
            password:hashedPassword
        })
        await user.save();
        return res.json({success:true,message:"User added"})

    } catch (error) {
        return res.json({success:false,message:error});
    }
};

export default registerUser;



//Route for admin login
const adminLogin = async (req, res) => {
    try {
        const {email,password}=req.body;
        if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET);
            return res.status(200).json({success:true,token});
        }
        else{
            return res.json({success:false,message:"Invalid credentials"});
        }
    } catch (error) {
        return res.send("False");
    }
}
export { loginUser, registerUser, adminLogin };