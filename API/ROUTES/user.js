import express from 'express';
const router = express.Router();
import { register , login , getUsers , getProfile } from '../CONTROLLERS/user.js';
import { Authenticate } from '../MIDDLEWARES/auth.js';

// // Register user : 
router.post('/register' , register);  // // api/user/register
router.post('/login' , login);  // // api/user/login
router.get('/all' , getUsers);  // // api/user
router.get('/profile' , Authenticate , getProfile);  // // api/user/profile


export default router;
