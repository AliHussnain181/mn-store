import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required:true
    }
});

mongoose.models = {}

export const Product = mongoose.model('Product', productSchema);


