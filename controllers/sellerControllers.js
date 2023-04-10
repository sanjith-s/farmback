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

const postSellerProducts = async(req, res) => {
    console.log(req.body);
    try{
        console.log()
        const query = new sellerProduct({
            productName: req.body.productName,
            price: req.body.price,
            quantity: req.body.quantity,
            type: req.body.type,
        });

        console.log(req);

        await query.save();
        console.log("After Saving Query related to Seller Product");
        res.status(201).json({message: "Seller Product Added"});
    } catch {
        console.log(req)
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
    postSellerProducts,
    getPastSales
}