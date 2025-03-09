import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
import userRouter from './ROUTES/user.js';
import productRouter from './ROUTES/productRoute.js';
import cartRouter from './ROUTES/cartRoute.js';
import addressRouter from './ROUTES/addressRouter.js'
import orderConfRoute from './ROUTES/orderConfRoute.js'
import cors from 'cors';
import path from 'path';

// // Second

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

async function connectToDB() {
    try {
        return await mongoose.connect(process.env.mongo_url).then(() => {
            console.log('Connected to the database');
        });
    } catch (error) {
        console.log('Error connecting to the database: ', error);
    }
};
connectToDB();

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter); 
app.use('/api/order', orderConfRoute);

// ✅ Serve Static Files (React Build)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

// ✅ Handle React Routing (if user opens any URL like /cart, /login)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});