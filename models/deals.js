const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deal= new Schema ({
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required:true
    },
    quantity:{
        type: String,
        required:true
    },
    specificType:{
        type: String,
        required:true
    },
    buyerAddress:{
        type: String,
        required:true
    },
    buyerName:{
        type: String,
        required:true
    }
}, {timestamps:true});
const Deal = mongoose.model('deals', deal);
module.exports=Deal;