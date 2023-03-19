const { request } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const requests = new Schema ({
    uid:{
        type:String,
        required:true
    },
    reqID:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    itemName:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    imgID: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Request = mongoose.model('request', requests);
module.exports = Request;