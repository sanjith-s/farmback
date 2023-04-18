const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const request= new Schema ({
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
    }

}, {timestamps:true});
const Request = mongoose.model('requests', request);
module.exports = Request;