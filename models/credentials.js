const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const credentialsSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    phoneno: {
        type: Number,
        required: true
    },

    aadhaarno: {
        type: Number,
        required: true
    },

    addline1: {
        type: String,
        required: true
    },

    addline2: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    district: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    pincode: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    typeOfAcc: {
        type: String,
        required: true
    },

    doc1:{
        type:String,
    },

    doc2:{
        type:String,
    },

    latitude:{
        type:Number,
    },
    
    longitude:{
        type:Number,
    }
}, {timestamps:true});

const Credentials = mongoose.model('Credential', credentialsSchema);
module.exports = Credentials;