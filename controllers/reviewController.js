const reviewAdd = require("../models/reviews");

const postReview = async(req, res) => {
    try{
        console.log(res.locals.details);
        const query = new reviewAdd({
            name:res.locals.name,
            email:res.locals.details,
            phonenum:res.locals.phoneno,
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