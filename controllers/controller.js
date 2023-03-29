const Users=require("../models/credentials");
const {hashPassword,verifyPassword}=require("../utilities/hashPassword");
const signup = async (req,res) => {
    const hashedPassword=hashPassword(req.body.password);
    let user = new Users(req.body);
    user.password=hashedPassword;
    try 
    {
        const post = await Users.find({email:req.body.email});
        if(post.length===0)
        {
            await user.save();
            res.status(201).json({message: "Success"});   
        }
        else
        {
            res.status(409).json({message: "User Exist already"}); 
        }
    } 
    catch(err) 
    {
        res.status(500).json({ message: err.message })
    }
  }
const login = async(req,res,next) => {
    let email = req.body.email;
    let password=req.body.password;
    try {
        const post = await Users.find({email:email});
        if(post.length===0) {
            res.status(404).json({message: "No user exists"});
        }
        else
        {
            if(verifyPassword(password,post[0].password))
            {
                res.locals.details=post;
                res.locals.name = post[0].name;
                res.locals.phoneno = post[0].phoneno;
                next();
            }
            else
            {
                res.status(406).json({message: "Password doesn't match"});  
            }
        }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}
const testJWT = async(req,res) =>{
    res.status(201).json({message:"JWT Working"});
}

const logout = async (req,res) => {
    let token = req.headers['tokenstring'];
    if(!token){
      return res.status(400).json({message: 'Missing Token'});
    }
    res.removeHeader('tokenstring');
    return res.status(200).json({ message: 'Logout Successful' });
}

const profile = async (req,res) => {
    let email = res.locals.details;
    try{
        const profile = await Users.find({email:email},{__v:0,password:0,createdAt:0,updatedAt:0});
        res.status(200).json({message: profile[0]});
    }
    catch{
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    login,
    signup,
    testJWT, 
    logout,
    profile
}