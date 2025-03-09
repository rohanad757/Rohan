import express from 'express';
const router = express.Router();
import { addProduct , getProduct , getProductById , updateProduct , deleteProduct } from '../CONTROLLERS/productController.js';

router.post('/add', addProduct);  // // /api/product/add
router.get('/all', getProduct);  // // /api/product/all
router.get('/:id', getProductById);  // // /api/product/:id
router.put('/:id', updateProduct);  // // /api/product/:id
router.delete('/:id', deleteProduct);  // // /api/product/:id


export default router;