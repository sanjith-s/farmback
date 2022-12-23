const express = require("express");
const router = express.Router();
const {login,signup,testJWT,logout} = require("../controllers/controller");
const {validateUserProfile}=require("../validations/userValidation");
const {tokenAuth}= require('../middlewares/tokenAuth');
const {createToken,sessionCheck,sessionDelete,logoutAll}=require("../controllers/user");
const {getMarkets,getProducts} = require("../controllers/buyerController");
const {ml_model} = require("../ml_model/crop_recommendation/test");
router.post("/login", login,createToken);
router.post("/signup", validateUserProfile, signup);
router.get("/testJWT",tokenAuth,sessionCheck,testJWT);
router.get("/logout",tokenAuth,sessionDelete,logout);
router.get("/buyer/market",tokenAuth,sessionCheck,getMarkets);
router.get("/buyer/products/:marketID", tokenAuth,sessionCheck,getProducts);
router.post("/ml_model/crop_recomendation",ml_model);
router.post("/logoutAll",logoutAll)
module.exports = router;