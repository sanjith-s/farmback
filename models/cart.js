const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cart= new Schema ({
    name:{
        type: String,
        required: true
    },
    phoneNumber: {
        type:String,
        required: true
    },
    address: {
        addrline1:{
            type:String
        },
        addrline2:{
            type:String
        }
    },
    items: {
        type: Array,
        required: true
    }
    
}, {timestamps:true});
const Cart = mongoose.model('carts', cart);
module.exports=Cart;