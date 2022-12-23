const { CreateJWT} = require('../services/jwtAuth');
const Session = require('../models/sessions');
const { VerifyJWT } = require('../services/jwtAuth');
const sessionCheck = async (req,res,next) =>{
    let token = req.headers['tokenstring'];
    let result = VerifyJWT(token);
    let email = result.email;
    try
    {
        const post = await Session.find({email:email,tokenID:token});
        if(post.length===1)
        {
            next();
        }
        else
        {
            res.status(404).json({message: "Session Logged Out , Please Login Again"});
        }
    }
    catch(err)
    {
        res.status(404).json({message: "Error in connection"});
    }
};
const createToken = async(req,res,next)=>{
    let email = req.body.email;
    const token = CreateJWT(email);
    res.set({
        'Content-Type': 'application/json',
        'tokenstring': token,
    });
    try{
        let session = new Session({email:email,tokenID:token});
        await session.save();
        next();
    }
    catch(err){
        res.status(400).json({message: "Error in login"});
    }
}
const sessionDelete = async (req,res,next) =>{
    let token = req.headers['tokenstring'];
    try
    {
        const post = await Session.deleteOne({tokenID:token});
        if(post.deletedCount===1)
        {
            next();
        }
        else
        {
            res.status(404).json({message: "Logout Fail, Please Logout Again"});
        }
    }
    catch(err)
    {
        res.status(404).json({message: "Error in connection"});
    }
}
module.exports={
    createToken,
    sessionCheck,
    sessionDelete
}