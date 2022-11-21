const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
let router;
mongoose.connect('mongodb+srv://Farmenience:Farm123@cluster0.ocxfoad.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to mongodb"); 
    router = require("./routes/router");
    app.use("",router);
})
.catch((err) => {
    console.log(err.message);
    process.exit(1);
});
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:3000'
// }));
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server started listening on ${PORT}`);
});
// mongoose.connect('mongodb+srv://Farmenience:Farm123@cluster0.ocxfoad.mongodb.net/?retryWrites=true&w=majority', {
//     useNewUrlParser:true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log("Connected to mongodb"); 
//     // router = require("./routes/router.js");
//     // app.use("/api/posts",router);
// })
// .catch((err) => {
//     console.log(err.message);
//     process.exit(1);
// });
// app.post("/check",(req,res)=>{
//     res.send( { message: "postman check.",err:null})
// })
// connect();
// app.post("/signup", (req, res)=> {
//     const email=req.body.email;
//     let str1={ email: email}; 
//     Credentials.findOne(str1, (err, user) => {
//         if(user){
//             res.send({message: "User already registered",err:null})
//         } else {
//             const user = new Credentials({
//                 name:req.body.name, 
//                 phoneno:req.body.phoneno,
//                 aadhaarno:req.body.aadhaarno,
//                 addline1:req.body.addline1,
//                 addline2:req.body.addline2,
//                 city:req.body.city,
//                 district:req.body.district,
//                 pincode:req.body.pincode,
//                 email:req.body.email,
//                 password:req.body.password
//             })
//             user.save(err => {
//                 if(err) {
//                     res.send({message:"Not Successful", err:err})
//                 } else {
//                     res.send( { message: "Successfully Registered, Please login now.",err:null})
//                 }
//             })
//         }
//     })
// })
// app.get("/login", (req, res)=> {
//     const {password} = req.body;
//     const email=req.body.email;
//     let str1={ email: email};
//     Credentials.findOne(str1, (err, user) => {
//         if(user){
//             if(password === user.password ) {
//                 res.send({message: "Login Successfull", name: user.name})
//             } else {
//                 res.send({ message: "Password didn't match",name: null})
//             }
//         } else {
//             res.send({message: "User not registered",name: null})
//         }
//     })
// })