const moongoose=require('mongoose');
const Schema=moongoose.Schema;

const farmerQuery = new Schema({
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    farmerid:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        required:true
    },
    response:{
        type:String,
    },
    responser:{
        type:Array,
    },
    parentID:{
        type:String,
    }
}, {timestamps:true});

const FarmerQuery=moongoose.model('farmerquery', farmerQuery);
module.exports=FarmerQuery;