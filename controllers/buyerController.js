const Market=require("../models/market");
const Product=require("../models/products");
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

module.exports = {
    getMarkets,
    getProducts
}