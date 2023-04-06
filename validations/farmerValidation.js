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

const validateFarmerMeet = (req,res,next)=>{
    const query=joi.object({
        date:joi.string().required(),
        time:joi.string().required(),
        details:joi.string().required().min(1).max(1000),
        crops:joi.string().required().min(1).max(100),
        reason:joi.string().required().min(1).max(300),
        ngotype:joi.string().min(1).max(10).pattern(/^(NGO|Non-NGO)+$/).required(),
        email:joi.string().email(),
        id:joi.string(),
        location:joi.string().required().min(1).max(200),
        filename:joi.string()
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

module.exports={validateFarmerQuery,validateFarmerMeet}