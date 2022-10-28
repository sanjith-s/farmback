const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose"); 
const app = express();
const dbURI = 'mongodb+srv://Farmenience:Farm123@cluster0.ocxfoad.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => app.listen(3001,()=>{
        console.log("Server is running");
    })
    .catch((err) => console.log(err)));