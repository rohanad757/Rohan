import { User } from "../MODELS/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name , email , password } = req.body;
        const userAlreadyExists = await User.findOne({ email });
        if(userAlreadyExists) {
            return res.status(400).json({ message : 'User already exists' , success : false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name , email , password : hashedPassword });
        if(!user) {
            return res.status(400).json({ message : 'User not created' , success : false });
        }
        return res.status(201).json({ message : 'User created' , user , success : true });
    } catch (error) {
        console.log('Error creating user: ', error);
        return res.status(500).json({ message : 'Internal server error' , success : false });      
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ message: 'User not found', success: false });
        }
        const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password', success: false });
        }
        const token = await jwt.sign({ userId : findUser._id } , "secretCode" , { expiresIn : '365d' });
        if(!token) {
            return res.status(400).json({ message: 'Token not generated', success: false });
        }
        return res.status(200).json({ message: 'User logged in', token , success: true });
    } catch (error) {
        console.log('Error logging in user: ', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// // Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        if(!users) {
            return res.status(400).json({ message : 'Users not found' , success : false });
        }
        return res.status(200).json(users);
    } catch (error) {
        
    }
};

// // Get Profile
export const getProfile = async (req , res) => {
    try {
        const user = req.userId;
        if(!user) {
            return res.status(400).json({ message : 'User not found' , success : false });
        }
        console.log('user: ', user);
        const userProfile = await User.findById(user);
        if (!userProfile) {
            return res.status(400).json({ message: 'User profile not found', success: false });
        }
        return res.status(200).json(userProfile);
    } catch (error) {
        console.log('Error getting profile: ', error);
        return res.status(500).json({ message : 'Internal server error' , success : false });
    }
};