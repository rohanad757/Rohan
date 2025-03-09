import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const confirmOrderSchema = new Schema({
    user_id: { type: ObjectId, ref: 'User' },
    order_date: { type: Date, default: Date.now },
    order_items: [{
        item_id: { type: ObjectId, ref: 'Cart' },
        item_title: { type: String, default: '' , ref: 'Cart' },
        item_qty: { type: Number, default: 0 , ref: 'Cart' },
        item_price: { type: Number, default: 0 , ref: 'Cart' },
    }],
    order_address: { type: String, default: '' , ref: 'Address' },
    order_payment_status: { type: Boolean, default: false },
    order_payment_date: { type: Date, default: Date.now },
});

export const ConfirmOrder = mongoose.model('ConfirmOrder' , confirmOrderSchema);