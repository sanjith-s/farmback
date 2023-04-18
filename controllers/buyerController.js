const Deal = require("../models/deals");
const Market = require("../models/market");
const indeProduct = require("../models/products");
const Product = require("../models/products");
const Transaction = require("../models/transactions");
const sellerProduct = require("../models/sellerProducts");
const Users = require("../models/credentials");
const Orders = require("../models/orders");
const Notifications = require("../models/notifications");
const productRequest = require('../models/productRequest');
const Cart = require("../models/cart");
const Order = require("../models/orders");
const Request = require("../models/requests");
const ReqOrder = require("../models/requestOrders");
const Transit = require("../models/transit");
require("dotenv").config();

const getMarkets = async (req, res) => {
  try{
    const data = await Users.find({typeOfAcc:"Retailer"});
    res.status(201).json({message: data});
}
catch{
    res.status(404).json({message: "Error in connection"});
}
  // try {
  //   const markets = await Market.find({});
  //   res.status(201).json({ message: markets });
  // } catch {
  //   res.status(500).json({ message: err.message });
  // }
};
const getProducts = async (req, res) => {
  try {
    const marketID = req.params.marketID;
    const products = await Product.find({ marketID: marketID }).sort({updatedAt: -1});
    res.status(201).json({ message: products });
  } catch {
    res.status(500).json({ message: err.message });
  }
};  

const buyProducts = async (req, res) => {
  try {
  } catch {}
};

const getDeals = async (req, res) => {
  try {
    const deals = await Deal.find({}).sort({updatedAt: -1});
    res.status(201).json({ message: deals });
    console.log("Got Deals");
  } catch {
    res.status(500).json({ message: err.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({}).sort({updatedAt: -1});
    res.status(201).json({ message: transactions });
    console.log("Got Transactions");
  } catch {
    res.status(500).json({ message: err.message });
  }
};

const postRequest = async (req, res) => {
    console.log(req);
    const email = res.locals.details;
    console.log(email);
  try {
    console.log(email);
    const profile = await Users.findOne({ email: email });
    const query = new Request({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      specificType: req.body.specificType,
      location: req.body.location,
      senderEmail: profile.email,
      senderName: profile.name,
      senderPhoneNo: profile.phoneno
    });

    console.log("dONE");

    // const reqQuery = new productRequest({
    //   uid: profile.email,
    //   name: profile.name,
    //   price: req.body.price,
    //   phoneNumber: profile.phoneno,
    //   itemName: req.body.name,
    //   quantity: req.body.quantity,
    //   address: {
    //     addline1: profile.addline1,
    //     addline2: profile.addline2
    //   }
    // })

    console.log("dONE 2");

    await query.save();
    // await reqQuery.save();

    console.log("After Saving Query");
    res.status(201).json({ message: "Product Request added !!" });
  } catch {
    res.status(404).json({ message: "Error in Connection." });
  }
};

const loadNotifications = async (req, res, next) => {
  let email = res.locals.details;
  try {
    const user = await Users.find({ email: email });
    const data = await Notifications.find({ userid: user[0]._id }).sort({updatedAt: -1});
    res.status(200).json({ message: data });
  } catch {
    res.status(404).json({ message: "Error in connection" });
  }
};

const loadOrders = async (req, res, next) => {
  let email = res.locals.details;
  try {
    const user = await Users.find({ email: email });
    const data = await Orders.findAll({ userid: user[0]._id }).sort({updatedAt: -1});
    res.status(200).json({ message: data });
  } catch {
    res.status(404).json({ message: "Error in connection" });
  }
};

const loadOrdersM0 = async (req, res, next) => {
  let email = res.locals.details;
  try {
    const user = await Users.find({ email: email });
    const data = await Orders.find({ userid: user[0]._id }).sort({ updatedAt: - 1 }).limit(3);
    res.status(200).json({ message: data });
  } catch {
    res.status(404).json({ message: "Error in connection" });
  }
};

const loadRequests = async (req,res,next) =>{
  let email = res.locals.details;
  try {
      const user = await Users.find({email:email});
      const data=await Request.findAll({uid:user[0]._id}).sort({updatedAt: -1});
      res.status(200).json({message: data});
  }
  catch{
      res.status(404).json({message: "Error in connection"});
  }
}

const postCart = async(req, res) =>  {
  let email = res.locals.details;
  try {
    const user = await Users.findOne({email: email});
    const query = new Cart({
      email: email,
      buyerName: user.name,
      phoneNumber: user.phoneno,
      address: {
        addrline1:user.addline1,
        addrline2:user.addline2
      },
      items: req.body.cartItems
    });

    await query.save();
  } catch {
    res.status(404).json({message: "Error in connection"});
  }
}

const getCart = async(req, res) => {
  let email = res.locals.details;
  console.log(email)
  try{
      const data = await Cart.findOne({email: email});
      // console.log(data);
      res.status(201).json({ message: data });
  }catch{
    res.status(404).json({ message: "Error in connection" });
  }
}

const loadProducts = async (req, res) => {
  try {
    let productNames = await sellerProduct.distinct("productName").sort({updatedAt: -1});
    console.log(productNames);
    filterProduct = [];

    filterValue = req.body.productName;
    if (filterValue.length == 0) {
      filterProduct = productNames;
    } else {
      filterProduct.push(filterValue);
    }

    // let result = await sellerProduct.aggregate([
    //   { $match: { productName: { $in: filterProduct } } },
    //   {
    //     $group: {
    //       _id: "$productName",
    //       records: {
    //         $push: "$$ROOT",
    //       },
    //     },
    //   },
    //   {
    //     $unwind: "$records",
    //   },
    //   {
    //     $sort: {
    //       "records.price": 1,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       records: {
    //         $push: "$records",
    //       },
    //     },
    //   },
    // ]);
    let result = await sellerProduct.find({});
    console.log(result);
    res.status(201).json({ message: result });
  } catch {
    res.status(404).json({ message: "Error in connection" });
  }
};

const fetchPrices = async (req, res) => {
  try {
    let data = await Transaction.find({}).select({_id: 0, time: 1, amount: 2});
    console.log(data);

    res.status(201).json({ priceHistory: data });
  } catch {
    res.status(404).json({ message: "Error in connection" });
  }
};

const postOrders = async (req, res) => {
  let email = res.locals.details;
  console.log(email);
  try{
      const query = new Order({
        email: email,
        items: req.body.items
      });

      await query.save();
      console.log("saved successfully");
  } catch {
    res.status(404).json({ message: "Error in connection" });
  }
}

const deleteCart = async(req, res) => {
  let email = res.locals.details;
  console.log("Entering Delete");
  try{
    console.log("into delete");
    const det = await Cart.findOneAndDelete({email:email});
    console.log("deleted successfully");
    res.status(201).json({message: "Deleted Successfully"});
  } catch {
    res.status(404).json({message: "Error in connection"});
  }
}

const postReqOrder = async(req, res) => {
    try{
        const query = new ReqOrder({
          name: req.body.name,
          price: req.body.price,
          quantity: req.body.quantity,
          specificType: req.body.specificType,
          location: req.body.location,
          senderEmail: req.body.senderEmail,
          senderName: req.body.senderName,
          senderPhoneNo: req.body.senderPhoneNo,
          negPrice: req.body.negPrice,
          negQuantity: req.body.negQuantity,
          recieverName: req.body.recieverName,
          recieverEmail: req.body.recieverEmail
      });
      await query.save();
      console.log("Saved Query to PostReqOrders");
      res.status(201).json({ message: "ReqOrders Added" });
    } catch{
      console.log(req)
      res.status(404).json({ message: "Error in connection" });
  }
}

const delRequest = async(req, res) => {
  let senderEmail = res.locals.details;
  let recieverEmail = req.body.recieverEmail;
  
  try{
    await Request.findOneAndDelete({senderEmail: senderEmail});
    console.log('Request Deleted');
    await Transit.findOneAndDelete({recieverEmail: recieverEmail});
    console.log('Transit Deleted');
  } catch {
    res.status(404).json({message: "Error in connection"});
  }
}

module.exports = {
  getMarkets,
  getProducts,
  getDeals,
  getTransactions,
  postRequest,
  loadNotifications,
  loadOrders,
  loadProducts,
  loadRequests,
  postCart,
  getCart,
  fetchPrices,
  postOrders,
  deleteCart,
  postReqOrder,
  delRequest
};
