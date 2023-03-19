const pastsales = require('../models/pastSales');
const Sale = require('../models/sale');
const Request = require('../models/productRequest')
const sellerProduct = require('../models/sellerProducts');

const getSales = async (req, res) => {
    try{
        const data = await Sale.find();
        res.status(201).json({message: data});
    } catch {
        res.status(404).json({message: "Error in connection"});
    }
}

const loadRequests = async (req,res,next) =>{
    let email=req.body.email;
    try {
        const user = await Users.find({email:email});
        const data=await Request.findAll({uid:user[0]._id});
        res.status(200).json({message: data});
    }
    catch{
        res.status(404).json({message: "Error in connection"});
    }
}

const getSellerProducts = async(req, res) => {
    try{
        const data = await sellerProduct.find({});
        res.status(201).json({message: data});
    } catch {
        res.status(404).json({message: "Error in connection"});
    }
}

const getPastSales = async(req, res) => {
    try{
        const data = await pastsales.find({});
        res.status(201).json({message: data});
    }catch {
        res.status(404).json({message : "Error bruh"});
    }
}

module.exports = {
    getSales,
    loadRequests,
    getSales,
    getSellerProducts,
    getPastSales
}