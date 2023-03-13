const bodyParser = require("body-parser");
const path = require('path');
const fs = require("fs");
const multer = require("multer");
const FarmerQuery=require("../models/farmerQuery");
const Users=require("../models/credentials");
const FarmerMeet=require("../models/farmerMeet");

// var storage = multer.diskStorage({
//     destination: function(req,file,cb) {
//         cb(null, 'uploads')
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// var upload = multer({ storage: storage })

const postQuery = async (req,res) => {
    try{
        let email=res.locals.details;
        const profile = await Users.find({email:email});
        const query=new FarmerQuery({
            subject:req.body.subject,
            description:req.body.description,
            farmerid:profile[0]._id,
            status:'Pending',
            response:'',
            responser:'',
            oldQuery:[],
        })
        await query.save();
        res.status(201).json({message: "Query Added Successfully"});
    }
    catch{
        res.status(400).json({message: "Error in connection"});
    }
}

const getQuery = async (req,res) =>{
    try{
        const email=res.locals.details;
        const profile = await Users.find({email:email});
        const data=await FarmerQuery.find({farmerid:profile[0]._id});
        res.status(201).json({message: data});
    }
    catch{
        res.status(404).json({message: "Error in connection"});
    }
}

const getSpecificQuery = async (req,res) => {
    try{
        const data=await FarmerQuery.findById(req.params.id);
        res.status(201).json({message: data});
    }
    catch{
        res.status(404).json({message: "Error in connection"});
    }
}

const deleteQuery = async (req,res)=>{
    try{
        await FarmerQuery.findByIdAndDelete(req.params.id);
        res.status(201).json({message: "Deleted Successfully"});
    }
    catch{
        res.status(404).json({message: "Error in connection"});
    }
}

const updateQuery = async(req,res)=>{
    try{
        let doc = await FarmerQuery.findOneAndUpdate({_id:req.body.id}, {
            subject:req.body.subject,
            description:req.body.description}, {
            new: true
          });
          res.status(201).json({message: "Edited Successfully"});
    }
    catch{
        res.status(404).json({message: "Error in connection"});
    }
}

const againPostQuery = async (req,res) => {
    try{
        const data=await FarmerQuery.findById(req.body.id);
        let addOld=[...data.oldQuery,{subject:data.subject,description:data.description,timedate:data.updatedAt,answer:data.response}];
        let doc = await FarmerQuery.findOneAndUpdate({_id:req.body.id}, {
            subject:req.body.subject,
            description:req.body.description,
            response:"",
            status:"Pending",
            oldQuery:addOld,
            responser:""
        }, {
            new: true
          });
          res.status(201).json({message: "Query Attached Successfully"});
    }
    catch{
        res.status(404).json({message: "Error in connection"});
    }
}

const postMeet = async (req,res) => {
    try{
        let email=res.locals.details;
        const profile = await Users.findOne({email:email});

        // var img = fs.readFileSync(req.file.path);
        // var encode_img = img.toString('base64');
        // var final_img = {
        //     contentType: req.file.mimetype,
        //     image: new Buffer(encode_img, 'base64')
        // };

        const query=new FarmerMeet({
            date:req.body.date,
            time:req.body.time,
            farmerid:profile._id,
            details:req.body.details,
            crops:req.body.crops,
            reason:req.body.reason,
            ngotype:req.body.ngotype,
            status:"Waiting for NGO",
            location: req.body.location,
            ngoname: "",
            farmername: profile.name,
            image: {
                data: fs.readFileSync('uploads/'+req.file.filename),
                contentType: "image/jpg"
            }
        })
        await query.save();
        res.status(201).json({message: "Meet Added, Waiting for NGO Reply"});
    }
    catch
    {
        res.status(404).json({message: "Error in connection"});
    }
}

const getMeet = async (req,res) => {
    try{
        const email=res.locals.details;
        const profile = await Users.find({email:email});
        const data=await FarmerMeet.find({farmerid:profile[0]._id});
        res.status(201).json({message: data});
    }
    catch{
        res.status(404).json({message: "Error in connection"});
    }
}

const acceptQuery = async (req,res) => {
    try{
        let doc = await FarmerQuery.findOneAndUpdate({_id:req.params.id}, {
            status:"Completed"
        }, {
            new: true
          });
          res.status(201).json({message: "Query You Accepted Successfully"});
    }
    catch
    {
        res.status(404).json({message: "Error in connection"});
    }
}

const acceptNewScheduleMeet = async (req,res) => {
    try{
        let meetDetails=await FarmerMeet.findById(req.params.id);
        let doc = await FarmerMeet.findByIdAndUpdate(req.params.id, {
            status:"Meet Accepted",
            time:meetDetails.requesttime,
            date:meetDetails.requestdate
            }, {
            new: true
          });
        res.status(201).json({message:"You Accepted the Meet"});
    }
    catch
    {
        return res.status(400).json({message:"Error in connection"});
    }
}

const notAcceptNewScheduleMeet = async (req,res) => {
    try{
        let doc = await FarmerMeet.findByIdAndUpdate(req.params.id, {
            status:"Waiting for NGO",
            requesttime:"",
            requestdate:""
            }, {
            new: true
          });
        res.status(201).json({message:"Not Accepted New Schedule Meet"});
    }
    catch
    {
        return res.status(400).json({message:"Error in connection"});
    }
}

module.exports={
    postQuery,
    getQuery,
    deleteQuery,
    updateQuery,
    againPostQuery,
    postMeet,
    getSpecificQuery,
    getMeet,
    acceptQuery,
    acceptNewScheduleMeet,
    notAcceptNewScheduleMeet
}