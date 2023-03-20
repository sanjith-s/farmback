const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const product= new Schema ({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
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
}, {timestamps: true});

const sellerProduct = mongoose.model('sellerProduct', product);
module.exports = sellerProduct;