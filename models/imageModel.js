const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const image= new Schema ({
    fileData:{
        type:Object,
        required:true
    }
}, {timestamps:true});

const Image = mongoose.model('images', image);
module.exports=Image;