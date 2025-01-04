import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import validator from 'validator'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user in the database by email
        console.log(userModel);
        const data = await userModel.findOne({ email: email });

        if (data) {
            // Compare the provided password with the hashed password stored in the database
            console.log("data", data);
            const match = await bcrypt.compare(password, data.hashedPassword);

            if (match) {
                console.log("Login success");
                return res.status(200).send({ success: true, message: "Login successful" });
            } else {
                return res.status(401).send({ success: false, message: "Invalid credentials" });
            }
        } else {
            // If user not found
            return res.status(404).send({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate input
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        if (password.length<6) {
            return res.status(400).json({ 
                success: false, 
                message: "Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character" 
            });
        }

        if (!name || name.trim() === "") {
            return res.status(400).json({ success: false, message: "Name is required" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new userModel({
            name,
            email,
            hashedPassword
        });

        const user = await newUser.save();

        // Create a JWT token
        const token = createToken(user.id);

        console.log("User registered successfully:", user);
        return res.status(201).json({ success: true, message: "User registered successfully", token });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export default registerUser;



//Route for admin login
const adminLogin = async (req, res) => {

}
export { loginUser, registerUser, adminLogin };