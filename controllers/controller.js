const Users = require("../models/credentials");
const signup = async (req,res) => {
      const user = new Users(req.body);
      try {
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
      } catch(err) {
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
            if(post[0].password===password)
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