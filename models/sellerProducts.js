const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const product= new Schema ({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    rating: {
        type: String,
        required: true
    },
    filename:{
        type:String,
        required: true
    },
    sellerName: {
        type:String,
        required: true
    },
    sellerEmail: {
        type:String,
        required: true
    }
}, {timestamps: true});

const sellerProduct = mongoose.model('sellerProduct', product);
module.exports = sellerProduct;