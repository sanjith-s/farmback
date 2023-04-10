const mongoose = require("mongoose");
require('dotenv').config()
const sellerProduct = require('./models/sellerProducts');


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



const find =  async () => {

    let productNames = await sellerProduct.distinct('productName');
    
    filterProduct = [];

    ineed = "apple";
    if(ineed.length==0) {
        filterProduct = productNames;
    } else {
        filterProduct.push("apple")
    }
    console.log(filterProduct);

    let result = await sellerProduct.aggregate([
        {'$match': { productName : {$in: filterProduct} } },
        {
          $group: {
            _id: "$productName",
            records: {
              $push: "$$ROOT"
            }
          }
        },{
            $unwind: '$records',
          },
          {
            $sort: {
              'records.price': 1,
            }
          },
          {
            $group: {
                _id: '$_id',
                records: {
                  $push: "$records"
                }
              }
          }
    ]);
    
    console.log(result);

} 

find();