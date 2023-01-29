const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()
let router;
mongoose.connect(process.env.localConnection, {
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
app.use(morgan('dev'));
app.use(cors());
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server started listening on ${PORT}`);
});
