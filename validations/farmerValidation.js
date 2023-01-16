const joi=require('joi');

const validateFarmerQuery = (req,res,next)=>{
    const query=joi.object({
        subject:joi.string().required().min(1).max(50),
        description:joi.string().required().min(1).max(1000),
        email:joi.string().email(),
        id:joi.string()
    });
    const {error} = query.validate(req.body);
    if(error)
    {
        res.status(400).json({message: error.details[0].message});
    }
    else
    {
        next();
    }
}

module.exports={validateFarmerQuery}