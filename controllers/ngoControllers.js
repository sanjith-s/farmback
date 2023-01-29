const FarmerQuery=require('../models/farmerQuery');
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
        console.log(profile);
        let doc = await FarmerQuery.findOneAndUpdate({_id:req.body.id}, {
            response:req.body.response,
            responser:profile.name
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

module.exports={
    getQueries,
    responseQuery
}