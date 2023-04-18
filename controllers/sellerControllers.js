const pastsales = require('../models/pastSales');
const Users = require("../models/credentials");
const Sale = require('../models/sale');
const Product = require('../models/products');
const Request = require('../models/requests')
const sellerProduct = require('../models/sellerProducts');
const Order = require('../models/orders');
const Transit = require('../models/transit');

const getSales = async (req, res) => {
    try {
        const data = await Sale.find();
        res.status(201).json({ message: data });
    } catch {
        res.status(404).json({ message: "Error in connection" });
    }
}

// const loadRequests = async (req, res, next) => {
//     let email = req.body.email;
//     try {
//         const user = await Users.find({ email: email });
//         const data = await Request.findAll({ uid: user[0]._id });
//         res.status(200).json({ message: data });
//     }
//     catch {
//         res.status(404).json({ message: "Error in connection" });
//     }
// }

const loadRequests = async (req, res, next) => {
    const email=res.locals.details;
    console.log(email,3);
    try {
        // const user = await Users.find({ email: email });
        const data = await Request.find({});
        console.log(data);
        res.status(200).json({ message: data });
    }
    catch {
        res.status(404).json({ message: "Error in connection" });
    }
}

const loadRequestsM0 = async (req, res, next) => {
    let email = res.locals.details;
    try {
        const user = await Users.find({ email: email });
        const data = await Request.find({ uid: user[0]._id }).sort({ updatedAt: - 1 }).limit(3);
        res.status(200).json({ message: data });
    }
    catch {
        res.status(404).json({ message: "Error in connection" });
    }
}

const postSellerProducts = async (req, res) => {
    let email = res.locals.details;
    console.log("Post seller : ", email);
    try {
        const profile = await Users.findOne({email: email});
        console.log(profile.name);
        console.log(profile.email);
        console.log(req.body.filename);
        const query = new sellerProduct({
            productName: req.body.productName,
            price: req.body.price,
            quantity: req.body.quantity,
            type: req.body.type,
            rating: req.body.rating,
            filename: "http://localhost:5000/files/" + req.body.filename,
            sellerName: profile.name + req.body.sellerName,
            sellerEmail: profile.email + req.body.sellerEmail
        });

        // console.log(query);
        await query.save();
        console.log("After Saving Query related to Seller Product");
        res.status(201).json({ message: "Seller Product Added" });
    } catch {
        console.log(req)
        res.status(404).json({ message: "Error in connection" });
    }
}

const getSellerProducts = async(req, res) => {
    let email = res.locals.details;
    try{
        const data = await sellerProduct
    }catch{

    }
}

const getPastSales = async (req, res) => {
    try {
        const data = await pastsales.find({});
        res.status(201).json({ message: data });
    } catch {
        res.status(404).json({ message: "Error bruh" });
    }
}

const getOrders = async(req, res) => {
    let email = res.locals.details;
    try{
        const data = await Order.find({email: email}).limit(1).sort({createdAt: -1});
        res.status(201).json({ message: data});
    }catch{
        res.status(404).json({ message: "Error in get orders"})
    }
}

const postTransit = async(req, res) => {
    let email = res.locals.details;
    console.log("Post Transit : ", email);
    try {
        const profile = await Users.findOne({email: email});
        console.log(profile.name);
        console.log(profile.email);
        console.log(req.body.filename);
        const query = new Transit({
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
            recieverName: profile.name,
            recieverEmail: profile.email
        });

        // console.log(query);
        await query.save();
        console.log("After Saving Query related to Seller Product");
        res.status(201).json({ message: "Seller Product Added" });
    }catch{
        console.log(req)
        res.status(404).json({ message: "Error in connection" });
    }
}

const getTransit = async(req, res) => {
    let email = res.locals.details;
    try{
        const transit = await Transit.find({senderEmail: email});
        console.log(transit[0]);
        res.status(201).json({ message: transit[0] });
    } catch {
        res.status(404).json({ message: "Error bruh" });
    }
}

module.exports = {
    getSales,
    loadRequests,
    loadRequestsM0,
    postSellerProducts,
    getPastSales,
    getOrders,
    postTransit,
    getTransit
}