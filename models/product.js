const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const product= new Schema ({
    name:{
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
    specificType:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
}, {timestamps: true});

const indeProduct = mongoose.model('products', product);
module.exports = indeProduct;