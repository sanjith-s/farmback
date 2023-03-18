const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notif = new Schema ({
    userid:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
}, {timestamps: true});

const Notification = mongoose.model('notification', notif);
module.exports = Notification;