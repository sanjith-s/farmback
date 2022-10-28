const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const credentialsSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    phoneno: {
        type: String,
        required: true
    },

    aadhaarno: {
        type: String,
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

    pincode: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
}, {timestamps:true});

const Credentials = mongoose.model('Credential', credentialsSchema);
module.exports = Credentials;