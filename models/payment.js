const { request } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payment = new Schema ({
    email:{
        type:String,
        required:true
    },
    rawData: {
        type: Object,
        required: true
    }
    
}, {timestamps: true});

const Payment = mongoose.model('payment', payment);
module.exports = Payment;