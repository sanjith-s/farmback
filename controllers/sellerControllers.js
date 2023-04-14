const pastsales = require('../models/pastSales');
const Users = require("../models/credentials");
const Sale = require('../models/sale');
const Product = require('../models/products');
const Request = require('../models/productRequest')
const sellerProduct = require('../models/sellerProducts');

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
        const data = await Request.find({ uid: email });
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
    console.log(req.body);
    try {
        console.log()
        const query = new sellerProduct({
            productName: req.body.productName,
            price: req.body.price,
            quantity: req.body.quantity,
            type: req.body.type,
            rating: req.body.rating,
            filename: "http://localhost:5000/files/" + req.body.filename
        });

        console.log(req);

        await query.save();
        console.log("After Saving Query related to Seller Product");
        res.status(201).json({ message: "Seller Product Added" });
    } catch {
        console.log(req)
        res.status(404).json({ message: "Error in connection" });
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

module.exports = {
    getSales,
    loadRequests,
    loadRequestsM0,
    postSellerProducts,
    getPastSales,
}