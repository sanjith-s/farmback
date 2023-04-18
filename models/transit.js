const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transit= new Schema ({
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
    },
    senderEmail: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    senderPhoneNo: {
        type: String,
        required: true
    },
    recieverName: {
        type: String,
        required: true
    },
    recieverEmail: {
        type: String,
        required: true
    },
    negPrice: {
        type: String,
        required: true
    },
    negQuantity: {
        type: String,
        required: true
    }

}, {timestamps:true});
const Transit = mongoose.model('transits', transit);
module.exports = Transit;