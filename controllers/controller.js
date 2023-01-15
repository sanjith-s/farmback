const Users=require("../models/credentials");
const {hashPassword,verifyPassword}=require("../utilities/hashPassword");
const signup = async (req,res) => {
    const hashedPassword=hashPassword(req.body.password);
    console.log(req.body.email);
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
                next();
            }
            else
            {
                res.status(406).json({message: "Password doesn't exist"});  
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

module.exports = {
    login,
    signup,
    testJWT, 
    logout
}