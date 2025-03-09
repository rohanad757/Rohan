import { Address } from "../MODELS/address.js";

export const addAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { fullName, address, city, state, country, pinCode, phoneNumber } = req.body;

        if (!fullName || !address || !city || !state || !country || !pinCode || !phoneNumber) {
            return res.status(400).json({ msg: 'All fields are required', success: false });
        }

        const sameAddress = await Address.findOne({ userId, address, pinCode });
        if (sameAddress) {
            return res.status(400).json({ msg: 'Address already exists', success: false });
        }

        const userAddress = new Address({ userId, fullName, address, city, state, country, pinCode, phoneNumber });
        await userAddress.save();

        return res.status(201).json({ msg: 'Address added successfully', address: userAddress, success: true });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error', success: false });
    }
};

export const getAddress = async (req , res) => {
    try {
        const userId = req.userId;
        const userAddress = await Address.find({ userId }).sort({ createdAt: -1 });
        if(!userAddress || userAddress.length === 0) {
        return res.status(404).json({ msg: 'No address found' , success: false });
        }
        return res.status(200).json({ address: userAddress[0] , success: true });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal server error' , success: false });
    }
};