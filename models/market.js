const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const market= new Schema ({
    name:{
        type: String,
        required: true,
    },
    location:{
        type:String,
        required: true,
    },
    owner:{
        type: String,
        required: true
    },
    distance:{
        type:Object,
        required: true,
        unique:true
    },
    rating:{
        type:Number,
        required: true
    },
    sellerDesc: {
        type: String,
        required: true
    }
}, {timestamps:true});
const Market = mongoose.model('markets', market);
module.exports=Market;