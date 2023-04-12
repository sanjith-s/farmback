const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const secretbook = new Schema ({
    email:{
        type: String,
        required: true,
        unique:true
    },
    userSecret:{
        type:String,
        required: true,
        unique:true
    }
}, {timestamps:true});

secretbook.index({createdAt: 1},{expireAfterSeconds: 36000});
const SecretBook = mongoose.model('secretBook', secretbook);

module.exports=SecretBook;

