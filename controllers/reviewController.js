const Review = require("../models/reviews");
const Users=require("../models/credentials");

const postReview = async(req, res) => {
    try{
        let email=res.locals.details;
        const profile = await Users.findOne({email:email});
        const query = new Review({
            name:profile.name,
            email:res.locals.details,
            phonenum:profile.phoneno,
            review:req.body.review,
        })
        
        await query.save();
        console.log("After Saving Query");
        res.status(201).json({message: "Review added !!"});
    } catch {
        res.status(404).json({message:"Error in Connection."});
    }
}

module.exports = {
    postReview,
}