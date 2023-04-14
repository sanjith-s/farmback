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
        // required:true
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
    price: {
        type: String,
        required: true
    },
    imgID: {
        type: String,
        // required: true
    },
    address: {
        addline1: {
            type: String
        },
        addline2: {
            type:String
        }
    }
}, {timestamps: true});

const Request = mongoose.model('request', requests);
module.exports = Request;