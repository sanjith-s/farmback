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

require("dotenv").config();

const getMarkets = async (req, res) => {
  try {
    const markets = await Market.find({});
    res.status(201).json({ message: markets });
  } catch {
    res.status(500).json({ message: err.message });
  }
};
const getProducts = async (req, res) => {
  try {
    const marketID = req.params.marketID;
    const products = await Product.find({ marketID: marketID });
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
    const deals = await Deal.find({});
    res.status(201).json({ message: deals });
    console.log("Got Deals");
  } catch {
    res.status(500).json({ message: err.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.status(201).json({ message: transactions });
    console.log("Got Transactions");
  } catch {
    res.status(500).json({ message: err.message });
  }
};

const postRequest = async (req, res) => {
  try {
    // console.log(req);
    const profile = await Users.findOne({ email: req.body.email });
    const query = new indeProduct({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      specificType: req.body.specificType,
      location: req.body.location,
      userEmail: profile.email
    });

    console.log("dONE");

    const reqQuery = new productRequest({
      uid: profile.email,
      name: profile.name,
      price: req.body.price,
      phoneNumber: profile.phoneno,
      itemName: req.body.name,
      quantity: req.body.quantity,
      address: {
        addline1: profile.addline1,
        addline2: profile.addline2
      }
    })

    console.log("dONE 2");

    await query.save();
    await reqQuery.save();

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
    const data = await Notifications.find({ userid: user[0]._id });
    res.status(200).json({ message: data });
  } catch {
    res.status(404).json({ message: "Error in connection" });
  }
};

const loadOrders = async (req, res, next) => {
  let email = res.locals.details;
  try {
    const user = await Users.find({ email: email });
    const data = await Orders.findAll({ userid: user[0]._id });
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
      const data=await Request.findAll({uid:user[0]._id});
      res.status(200).json({message: data});
  }
  catch{
      res.status(404).json({message: "Error in connection"});
  }
}

const loadProducts = async (req, res) => {
  try {
    let productNames = await sellerProduct.distinct("productName");
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

module.exports = {
  getMarkets,
  getProducts,
  getDeals,
  getTransactions,
  postRequest,
  loadNotifications,
  loadOrders,
  loadProducts,
  loadRequests
};
