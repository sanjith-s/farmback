const jwt = require('jsonwebtoken');

const CreateJWT = (email) => {
   var token = jwt.sign({ email: email }, process.env.jwtSecretKey, {
      expiresIn: 86400,
      algorithm: process.env.signingAlgo
   });

   return token;
};

const VerifyJWT = (token) => {
   let decoded;
   try {
      decoded = jwt.verify(token, process.env.jwtSecretKey);
   } catch (err) {
      return err;
   }
   return decoded;
};

module.exports = {
   CreateJWT,
   VerifyJWT,
};