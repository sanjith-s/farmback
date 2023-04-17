const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orders = new Schema ({
    email:{
        type:String,
        required:true
    },
    // trackID:{
    //     type:String,
    //     required:true
    // },
    // statusHistory:{
    //     type:Array,
    //     required:true
    // },
    // orderNum:{
    //     type:String,
    //     required:true
    // },
    // destination:{
    //     type:String,
    //     required:true
    // },
    items:{
        type: Array,
    }
}, {timestamps: true});

const Order = mongoose.model('order', orders);
module.exports = Order;