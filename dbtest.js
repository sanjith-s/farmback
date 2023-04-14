const mongoose = require("mongoose");
require('dotenv').config()
const sellerProduct = require('./models/sellerProducts');
const TransTest = require('./models/transTest');


mongoose.connect(process.env.localConnection, {
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to mongodb"); 
})
.catch((err) => {
    console.log(err.message);
    process.exit(1);
});

// sellerProduct.create({productName: "molaga podi", price: 99.5, quantity: "10", type: "masala", rating: "9.7"});
// sellerProduct.create({productName: "molaga podi", price: 12.3, quantity: "10", type: "masala", rating: "9.7"});

// sellerProduct.create({productName: "apple", price: 232.34, quantity: "100", type: "fruit", rating: "7.7"});
// sellerProduct.create({productName: "apple", price: 2.2, quantity: "10", type: "fruit", rating: "9.7"});


// sellerProduct.create({productName: "orange", price: 43.2, quantity: "10", type: "fruit", rating: "9.7"});
// sellerProduct.create({productName: "orange", price: 9.2, quantity: "10", type: "fruit", rating: "9.7"});


// for(let i=0; i<100; ++i) {
//   TransTest.create({time: new Date(), amount: i*10});  
// }


const find =  async () => {

    let data = await TransTest.find({}).select({_id: 0, time: 1, amount: 2});
    
    console.log(data);

} 

find();