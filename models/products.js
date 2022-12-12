const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const product= new Schema ({
    marketID:{
        type: String,
        required: true
    },
    products:{
        type: Array,
        required: true
    }
    

}, {timestamps:true});
const Product = mongoose.model('products', product);
module.exports=Product;