import { Product } from "../MODELS/productModel.js";

// // add product : 
export const addProduct = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Please fill all required fields" , success: false });
        }
        const { title, description, price, category, qty, imgSrc } = req.body;
        const newProduct = await Product.create({ title, description, price, category, qty, imgSrc });
        if(!newProduct) {
            return res.status(400).json({ message: "Product not added" , success: false });
        }
        return res.status(201).json({ message: "Product added successfully" , newProduct , success: true });
    } catch (error) {
        res.status(500).json({ message: error.message , success: false });
    }
};

// // get all products :
export const getProduct = async (req, res) => {
    try {
        const allProducts = await Product.find().sort({ createdAt: -1 });
        if(!allProducts) {
            return res.status(400).json({ message: "No products found" , success: false });
        }
        return res.status(200).json({ allProducts , success: true });
    } catch (error) {
        res.status(500).json({ message: error.message , success: false });
    }
};

// // get single product by id :
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(400).json({ message: "Product not found" , success: false });
        }
        return res.status(200).json({ product , success: true });
    } catch (error) {
        res.status(500).json({ message: error.message , success : false });
    }
};

// // update product by id :
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(400).json({ message: "Product not found" , success: false });
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id , req.body , { new: true });
        if(!updatedProduct) {
            return res.status(400).json({ message: "Product not updated" , success: false });
        }
        return res.status(200).json({ message: "Product updated successfully" , updatedProduct , success: true });
    } catch (error) {
        res.status(500).json({ message: error.message , success: false });
    }
};

// // delete product by id :
export const deleteProduct = async (req , res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(400).json({ message: "Product not found" , success: false });
        }
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Product deleted successfully" , success: true });
    } catch (error) {
        res.status(500).json({ message: error.message , success: false });   
    }
};