import express from 'express';
const router = express.Router();
import { addToCart , getCart , removeProduct , clearCart , decreaseQty , incrementQty } from '../CONTROLLERS/cartController.js';
import { Authenticate } from '../MIDDLEWARES/auth.js';


router.post('/add' , Authenticate , addToCart);  // // /api/cart/add
router.get('/all' , Authenticate , getCart);     // // /api/cart/all
router.delete('/remove/:id' , Authenticate , removeProduct); // // /api/cart/remove/:id
router.delete('/clear' , Authenticate , clearCart); // // /api/cart/clear
router.put('/decrease/:id' , Authenticate , decreaseQty); // // /api/cart/decrease/:id
router.put('/increase/:id' , Authenticate , incrementQty); // // /api/cart/increase/:id

export default router;
