const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sale = new Schema ({
    saleId: {
        type:String,
        required:true
    },
    saleName: {
        type:String,
        required: true
    },
    orderDate: {
        type:Date,
        required:true
    },
    deliveryDate: {
        type:Date,
        required: true
    },
    clientName: {
        type:String,
        required:true
    },
    sellerName: {
        type:String,
        required: true
    },
    billingAddress: {
        type:String,
        required:true
    },
    bill: {
        type:Array,
        required: true
    },
    paymentMode: {
        type:String,
        required:true
    },
    remarks: {
        type:String,
        required: true
    },
}, {timestamps: true});

const pastsales = mongoose.model('pastsales', sale);
module.exports = pastsales;

