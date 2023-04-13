const FarmerQuery = require('../models/farmerQuery');
const FarmerMeet = require('../models/farmerMeet');
const Users = require("../models/credentials");

const getQueries = async (req, res) => {
    try {
        const data = await FarmerQuery.find({ response: "" });
        return res.status(201).json({ message: data });
    }
    catch
    {
        return res.status(400).json({ message: "Error in connection" })
    }
}

const getQueriesN10 = async (req, res) => {
    try {
        var date_time = new Date();
        const data = await FarmerQuery.find({ response: "", updatedAt: { $lt: date_time } }).sort({ updatedAt: -1 }).limit(5);
        return res.status(201).json({ message: data });
    }
    catch
    {
        return res.status(400).json({ message: "Error in connection" })
    }
}

const responseQuery = async (req, res) => {
    try {
        const profile = await Users.findOne({ email: req.body.email });
        let doc = await FarmerQuery.findOneAndUpdate({ _id: req.body.id }, {
            response: req.body.response,
            responser: profile.name,
            status: "Pending status from farmer",
        }, {
            new: true
        });
        res.status(201).json({ message: "Reponse Submitted Successfully" });
    }
    catch
    {
        return res.status(400).json({ message: "Error in connection" });
    }
}

const getMeets = async (req, res) => {
    try {
        const data = await FarmerMeet.find({ status: "Waiting for NGO" });
        return res.status(201).json({ message: data });
    }
    catch
    {
        return res.status(400).json({ message: "Error in connection" })
    }
}

const getMeetsN10 = async (req, res) => {
    try {
        var date_time = new Date();
        const data = await FarmerMeet.find({ status: "Waiting for NGO", updatedAt: { $lt: date_time } }).sort({ updatedAt: -1 }).limit(5);
        return res.status(201).json({ message: data });
    }
    catch
    {
        return res.status(400).json({ message: "Error in connection" })
    }
}

const acceptMeetByNGO = async (req, res) => {
    try {
        const profile = await Users.findOne({ email: req.body.email });
        let doc = await FarmerMeet.findByIdAndUpdate(req.params.id, {
            status: "Meet Accepted",
            ngoname: profile.name
        }, {
            new: true
        });
        res.status(201).json({ message: "You Accepted the Meet" });
    }
    catch
    {
        return res.status(400).json({ message: "Error in connection" });
    }
}

const changeOfTime = async (req, res) => {
    try {
        const profile = await Users.findOne({ email: req.body.email });
        let doc = await FarmerMeet.findByIdAndUpdate(req.params.id, {
            status: "Request to Change Time and Date",
            ngoname: profile.name,
            requesttime: req.body.time,
            requestdate: req.body.date
        }, {
            new: true
        });
        res.status(201).json({ message: "Requested for Change the schedule for the Meet" });
    }
    catch
    {
        return res.status(400).json({ message: "Error in connection" });
    }
}

module.exports = {
    getQueries,
    getQueriesN10,
    responseQuery,
    getMeets,
    getMeetsN10,
    acceptMeetByNGO,
    changeOfTime
}