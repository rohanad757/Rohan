import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartItemSchema = new Schema({
    productId : { type: ObjectId, required: true , ref: 'Product'},
    title : { type: String, required: true },
    price : { type: Number, required: true },
    qty : { type: Number, required: true },
    imgSrc : { type: String, required: true }
});

const cartSchema = new Schema({
    userId : { type: ObjectId, required: true , ref: 'User' },
    items : [cartItemSchema]
});

export const Cart = mongoose.model('Cart', cartSchema);