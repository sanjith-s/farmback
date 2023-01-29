const FarmerQuery=require("../models/farmerQuery");
const Users=require("../models/credentials");
const FarmerMeet=require("../models/farmerMeet");

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
        const profile = await Users.find({email:email});
        const query=new FarmerMeet({
            date:req.body.date,
            time:req.body.time,
            farmerid:profile[0]._id,
            details:req.body.details,
            crops:req.body.crops,
            reason:req.body.reason,
            ngotype:req.body.ngotype,
            status:"Waiting for NGO"
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

module.exports={
    postQuery,
    getQuery,
    deleteQuery,
    updateQuery,
    againPostQuery,
    postMeet,
    getSpecificQuery,
    getMeet
}