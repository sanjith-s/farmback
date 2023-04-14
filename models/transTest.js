const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transTest = new Schema ({
    amount:{
        type:String,
        required:true
    },
    time: {
        type:Date,
        required:true
    }
}, {timestamps: true});
const TransTest = mongoose.model('transtest', transTest);
module.exports = TransTest;
