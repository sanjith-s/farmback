const FarmerQuery=require("../models/farmerQuery");
const Users=require("../models/credentials");

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
            responser:[]
        })
        await query.save();
        res.status(201).json({message: "Query Added Successfully"});
    }
    catch{
        res.status(404).json({message: "Error in connection"});
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

const deleteQuery = async (req,res)=>{
    try{
        await FarmerQuery.findByIdAndDelete(req.body.id);
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

module.exports={
    postQuery,
    getQuery,
    deleteQuery,
    updateQuery
}