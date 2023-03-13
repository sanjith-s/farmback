const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transaction= new Schema ({
    IFSC:{
        type:String,
        required:true
    },
    transactionId:{
        type:String,
        required:true
    },
    paymentMode:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    senderName:{
        type:String,
        required:true
    },
    recvName:{
        type:String,
        required:true
    },
    bankName:{
        type:String,
        required:true
    }
}, {timestamps: true});
const Transaction = mongoose.model('transactions', transaction);
module.exports = Transaction;
