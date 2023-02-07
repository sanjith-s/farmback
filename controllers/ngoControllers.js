const FarmerQuery=require('../models/farmerQuery');
const FarmerMeet=require('../models/farmerMeet');
const Users=require("../models/credentials");

const getQueries = async (req,res) => {
    try{
        const data=await FarmerQuery.find({response:""});
        return res.status(201).json({message:data});
    }
    catch
    {
        return res.status(400).json({message: "Error in connection"})
    }
}

const responseQuery = async (req,res) => {
    try{
        const profile=await Users.findOne({email:req.body.email});
        let doc = await FarmerQuery.findOneAndUpdate({_id:req.body.id}, {
            response:req.body.response,
            responser:profile.name,
            status:"Pending status from farmer",
            }, {
            new: true
          });
        res.status(201).json({message:"Reponse Submitted Successfully"});
    }
    catch
    {
        return res.status(400).json({message:"Error in connection"});
    }
}

const getMeets = async (req,res) => {
    try{
        const data=await FarmerMeet.find({status:"Waiting for NGO"});
        return res.status(201).json({message:data});
    }
    catch
    {
        return res.status(400).json({message: "Error in connection"})
    }
}

module.exports={
    getQueries,
    responseQuery,
    getMeets
}