const express = require("express");
const mongoose = require("mongoose"); 
const app = express();
app.use(express.json())
const Credentials = require("./models/credentials")
const dbURI = 'mongodb+srv://Farmenience:Farm123@cluster0.ocxfoad.mongodb.net/?retryWrites=true&w=majority';
app.listen(3001,()=>{
    console.log("Server is running");
});
async function connect() {
    try {
      mongoose.connect(dbURI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error(error);
    }
  }
app.post("/check",(req,res)=>{
    res.send( { message: "postman check.",err:null})
})
connect();
app.post("/signup", (req, res)=> {
    console.log(req.body.name);
    let str1={ email: req.body.email};
    let email=req.body.email;
    Credentials.findOne(str1, (user) => {
        if(user){
            res.send({message: "User already registered",err:null})
        } else {
            const user = new Credentials({
                name:req.body.name, 
                phoneno:req.body.phoneno,
                aadhaarno:req.body.aadhaarno,
                addline1:req.body.addline1,
                addline2:req.body.addline2,
                city:req.body.city,
                district:req.body.district,
                pincode:req.body.pincode,
                email:req.body.email,
                password:req.body.password
            })
            user.save(err => {
                if(err) {
                    res.send({message:"", err:err})
                } else {
                    res.send( { message: "Successfully Registered, Please login now.",err:null})
                }
            })
        }
    })  
})
app.get("/login", (req, res)=> {
    const {password} = req.body;
    const email=req.body.email;
    console.log(email);
    let str1={ email: email};
    Credentials.findOne(str1, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", name: user.name})
            } else {
                res.send({ message: "Password didn't match",name: null})
            }
        } else {
            res.send({message: "User not registered",name: null})
        }
    })
})