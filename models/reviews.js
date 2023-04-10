const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review= new Schema ({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenum:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    }
}, {timestamps:true});
const Review = mongoose.model('reviews', review);
module.exports=Review;