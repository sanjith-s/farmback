const Sale = require('../models/sale');

const getSales = async (req, res) => {
    try{
        const data = await Sale.find();
        res.status(201).json({message: data});
    } catch {
        res.status(404).json({message: "Error in connection"});
    }
}

module.exports = {
    getSales
}