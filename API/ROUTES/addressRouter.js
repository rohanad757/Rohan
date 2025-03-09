import express from 'express';
const router = express.Router();
import { Authenticate } from '../MIDDLEWARES/auth.js';
import { addAddress , getAddress } from '../CONTROLLERS/addressController.js';


router.post('/add' , Authenticate , addAddress);  // // api/address/add
router.get('/get' , Authenticate , getAddress);  // // api/address/get


export default router;