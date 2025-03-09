import { Cart } from '../MODELS/cartModel.js';

// // Add to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, title, price, qty, imgSrc } = req.body;
        let cart = await Cart.findOne({ userId });
        
        if (!cart) {
            cart = await Cart.create({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
        
        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            item.qty += qty;
            item.price += price;
            cart.items[itemIndex] = item;
        } else {
            cart.items.push({ productId, title, price, qty, imgSrc });
        }
        await cart.save();
        res.status(200).json({ message: 'Item added to cart', success: true, cart });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// // Get user cart
export const getCart = async (req , res) => {
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({ userId });
        if(!cart) {
            return res.status(200).json({ message: 'Cart is empty', success: true, cart: [] });
        }
        res.status(200).json({ message: 'Cart fetched successfully', success: true, cart });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// // Remove a product from cart
export const removeProduct = async (req , res) => {
    try {
        const userId = req.userId;
        const productId = req.params.id;
        const cart = await Cart.findOne({ userId });
        if(!cart) {
            return res.status(200).json({ message: 'Cart is empty', success: true, cart: [] });
        }
        const deleteProductInCart = await Cart.findOneAndUpdate({ userId }, { $pull: { items: { productId } } }, { new: true });
        if (!deleteProductInCart) {
            return res.status(400).json({ message: 'Product not found in cart', success: false });
        }
        return res.status(200).json({ message: 'Product removed from cart', success: true, cart: deleteProductInCart.items || [] });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// // Delete all items from cart
export const clearCart = async (req , res) => {
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({ userId });
        if(!cart) {
            return res.status(200).json({ message: 'Cart is empty', success: true, cart: [] });
        }
        cart.items = [];
        await cart.save();
        return res.status(200).json({ message: 'Cart cleared successfully', success: true, cart });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });   
    }
};

// // Decrease product quantity
export const decreaseQty = async (req , res) => {
    try {
        const userId = req.userId;
        const productId = req.params.id;
        const cart = await Cart.findOne({ userId });
        if(!cart) {
            return res.status(200).json({ message: 'Cart is empty', success: true, cart: [] });
        }
        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            const originalQty = item.qty;
            item.qty -= 1;
            item.price = (item.price / originalQty) * item.qty;
            if (item.qty === 0) {
                cart.items = cart.items.filter(p => p.productId.toString() !== productId);
            } else{cart.items[itemIndex] = item;}
        }
        await cart.save();
        return res.status(200).json({ message: 'Product quantity decreased', success: true, cart });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });   
    }
};

// // Increase product quantity
export const incrementQty = async (req , res) => {
    try {
        const userId = req.userId;
        const productId = req.params.id;
        const cart = await Cart.findOne({ userId });
        if(!cart) {
            return res.status(200).json({ message: 'Cart is empty', success: true, cart: [] });
        }
        const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);
        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            item.qty += 1;
            item.price += item.price / (item.qty - 1);
            cart.items[itemIndex] = item;
        }
        await cart.save();
        return res.status(200).json({ message: 'Product quantity increased', success: true, cart });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
}
