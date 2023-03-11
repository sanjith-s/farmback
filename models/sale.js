const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sale= new Schema ({
    saleID:{
        type: String,
        required: true
    },
    saleName:{
        type: String,
        required: true
    },
    orderDate:{
        type: Date,
        required: true
    },
    deliveryDate:{
        type: Date,
        required: true
    },
    clientName:{
        type: String,
        required: true
    },
    billingAddress:{
        type: String,
        required: true
    },
    items:{
        type: Array,
        required:true
    },
    paymentMode:{
        type:String,
        required: true
    },
    remarks:{
        type: String,
        required: true
    },
    saleAmount:{
        type: String,
        required: false
    }
}, {timestamps:true});
const Sale = mongoose.model('sales', sale);
module.exports=Sale;