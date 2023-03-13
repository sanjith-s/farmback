const Deal = require("../models/deals");
const Market=require("../models/market");
const indeProduct = require("../models/product");
const Product=require("../models/products");
const Transaction = require('../models/transactions');

const getMarkets = async (req,res) =>{
    try{
        const markets= await Market.find({});
        res.status(201).json({message: markets});
    }
    catch{
        res.status(500).json({ message: err.message })
    }
} 
const getProducts = async (req,res) => {
    try{
        const marketID=req.params.marketID;
        const products= await Product.find({marketID:marketID});
        res.status(201).json({message: products});
    }
    catch{
        res.status(500).json({ message: err.message});
    }
}
const buyProducts = async(req,res) =>{
    try{

    }
    catch{
        
    }
}

const getDeals = async(req, res)=> {
    try{
        const deals = await Deal.find({});
        res.status(201).json({message: deals});
    }catch{
        res.status(500).json({ message: err.message });
    }
}

const getTransactions = async(req, res) => {
    try{
            const transactions = await Transaction.find({});
            res.status(201).json({message: transactions});
    } catch {
        res.status(500).json({message: err.message});
    }
}

const postRequest = async(req, res) => {
    try{
        const query = new indeProduct({
            name:req.name,
            price:req.price,
            quantity:req.quantity,
            specificType:req.specificType,
            location:req.location,
        })
        await query.save();
        res.status(201).json({message: "Product Request added !!"});
    } catch {
        res.status(404).json({message:"Error in Connection."});
    }
}

module.exports = {
    getMarkets,
    getProducts,
    getDeals,
    getTransactions,
    postRequest
}