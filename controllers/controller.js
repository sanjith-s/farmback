const Users = require("../models/credentials");
const {hashPassword,verifyPassword}=require("../utilities/hashPassword")
const signup = async (req,res) => {
    const hashedPassword=hashPassword(req.body.password);
    let user = new Users(req.body);
    console.log(hashedPassword);
    user.password=hashedPassword;
    console.log(user);
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
            res.status(201).json({message: "User Exist already"}); 
        }
    } 
    catch(err) 
    {
        res.status(500).json({ message: err.message })
    }
  }
const login = async(req,res) => {
    let email = req.params.email;
    let password=req.params.password;
    try {
        const post = await Users.find({email:email});
        if(post.length===0) {
            return res.send({message: "No user exist exists"});
        }
        else
        {
            if(verifyPassword(password,post[0].password))
            {
                res.status(201).json({message: "Sucessful"});  
            }
            else
            {
                res.status(201).json({message: "Password doesn't exists"});  
            }
        }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    login,
    signup
}