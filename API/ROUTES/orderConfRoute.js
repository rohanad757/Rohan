import express from 'express';
const router = express.Router();
import { Authenticate } from '../MIDDLEWARES/auth.js';
import { confirmOrder } from '../CONTROLLERS/orderConfController.js';

router.post('/confirmOrder', Authenticate, confirmOrder);  // // /api/order/confirmOrder


export default router;