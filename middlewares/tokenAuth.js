const { VerifyJWT } = require('../services/jwtAuth');

const tokenAuth = async (req, res, next) => {
   let token = req.headers['tokenstring'];
   // console.log(req.params.id)
   if (!token) {
      return res.status(400).json({
         message: 'Token not found',
         isExpired: true,
      });
   }
   let result = VerifyJWT(token);
   if (result.email==undefined) {
      return res.status(400).json({
         message: 'Invalid token',
         isExpired: true,
      });
   }
   req.body.email=result.email;
   next();
};

module.exports = {
    tokenAuth
}