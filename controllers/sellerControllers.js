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
    getSales,
    getSellerProducts,
    getPastSales
}