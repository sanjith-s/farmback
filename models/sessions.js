const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const session= new Schema ({
    email:{
        type: String,
        required: true,
        unique:true
    },
    tokenID:{
        type:String,
        required: true,
        unique:true
    }
}, {timestamps:true});
const Session = mongoose.model('sessions', session);
module.exports=Session;