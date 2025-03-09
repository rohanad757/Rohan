import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const addressSchema = new Schema({
    userId : { type: ObjectId, required: true , ref: 'User' },
    fullName : { type: String, required: true },
    address : { type: String, required: true },
    city : { type: String, required: true },
    state : { type: String, required: true },
    country : { type: String, required: true },
    pinCode : { type: String, required: true },
    phoneNumber : { type: String, required: true },
    createdAt : { type: Date, default: Date.now }
});

export const Address = mongoose.model('Address' , addressSchema);