const moongoose=require('mongoose');
const Schema=moongoose.Schema;

const farmerMeet = new Schema({
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    farmerid:{
        type:String,
        required: true,
    },
    details:{
        type:String,
    },
    crops:{
        type:String,
    },
    reason:{
        type:String,
    },
    ngotype:{
        type:String,
    },
    status:{
        type:String,
    },
    location:{
        type:String,
    },
    ngoname:{
        type:String,
    },
    requesttime:{
        type:String,
    },
    requestdate:{
        type:String,
    },
    farmername:{
        type:String, 
    },
    image:{
        data: Buffer,
        contentType: String
    }
}, {timestamps:true});

const FarmerMeet=moongoose.model('farmermeet', farmerMeet);
module.exports=FarmerMeet;