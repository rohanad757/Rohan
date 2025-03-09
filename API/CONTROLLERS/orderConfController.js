import { ConfirmOrder } from "../MODELS/confirmOrder.js";
import { Cart } from "../MODELS/cartModel.js";
import { Address } from "../MODELS/address.js";

export const confirmOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const cartItens = await Cart.findOne({ userId });
        if (!cartItens) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        const orderItems = cartItens.items.map((item) => ({
            item_id: item.productId,  
            item_title: item.title,
            item_qty: item.qty,      
            item_price: item.price,   
        }));
        const address = await Address.findOne({ userId });
        if (!address) {
            return res.status(400).json({ message: "Address not found" });
        }
        const order = await ConfirmOrder.create({
            user_id: userId,
            order_items: orderItems,
            order_address: address.address,
        });

        if (!order) {
            return res.status(400).json({ message: "Order failed" });
        }
        // await Cart.findOneAndDelete({ userId });
        res.status(200).json({ 
            message: "Order confirmed successfully",
            order: {
                orderId: order._id,
                items: order.order_items,
                address: order.order_address,
                date: order.order_date
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: "Something went wrong",
            error: error.message 
        });
    }
};