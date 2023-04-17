const Users=require("../models/credentials");
const SecretBook=require("../models/otp");

const {hashPassword,verifyPassword}=require("../utilities/hashPassword");
const otpGenerator = require('otp-generator');

const {sendMail} = require("../utilities/sendOTP");

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
                res.locals.details = post;
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
        console.log(profile);
        res.status(200).json({message: profile[0]});
    }
    catch{
        res.status(500).json({ message: err.message })
    }
}

const generateOTP = async(req,res,next) => {
    let email = req.body.email;
    try {
        SecretBook.remove({});
        console.log(req.body)
        const user = await Users.find({email:email});
        //console.log(user.length);
        if(user.length===0) {
            res.status(404).json({message: "No user exists"});
        }
        else
        {
                res.locals.name = user[0].name;
                let otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
                const hashedOTP=hashPassword(otp);
                let secret = new SecretBook({email: email, userSecret: hashedOTP});
                await secret.save();
                sendMail(email, otp);
                next();
        }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

const verifyOTP = async(req,res,next) => {
    let otp = req.body.otp;
    try {

        console.log(req.body)
        const record = await SecretBook.find({email:email});
        if(record.length===0) {
            res.status(404).json({message: "OTP Expired. Retry!!"});
        }
        else
        {
                if(verifyPassword(otp, record[0].userSecret)) {
                    res.status(200).json({message: "Verification Successful"});
                } else {
                    res.status(401).json({message: "Invalid OTP. Try Again!"})
                }
        }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

const resetPassword = async(req,res,next) => {
    let email = req.body.email;
    try {
        const record = await Users.findOne({email:email});
        if(record.length===0) {
            res.status(404).json({message: "User Not found!!"});
        }
        else
        {
            record.password = hashPassword(req.body.password);
            await record.save();
            next();
            res.status(200).json({ message: "Password Save successful" })
        }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

const resetDone = async (req,res) => {
    let token = req.headers['tokenstring'];
    if(!token){
      return res.status(400).json({message: 'Missing Token'});
    }
    res.removeHeader('tokenstring');
    return res.status(200).json({ message: 'Password Save Successful' });
}

const checkToken = async (req,res) => {
    try {
        res.status(200).json({ message: "Success Token" })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}


module.exports = {
    login,
    signup,
    testJWT, 
    logout,
    profile,
    generateOTP,
    verifyOTP,
    resetPassword,
    resetDone,
    checkToken
} 