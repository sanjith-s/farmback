const express = require("express");
const router = express.Router();
const {login,signup,testJWT,logout,profile} = require("../controllers/controller");
const {validateUserProfile}=require("../validations/userValidation");
const {validateFarmerQuery,validateFarmerMeet}=require("../validations/farmerValidation");
const {tokenAuth}= require('../middlewares/tokenAuth');
const {createToken,sessionCheck,sessionDelete,logoutAll}=require("../controllers/user");
const {getMarkets,getProducts, getDeals, getTransactions, postRequest} = require("../controllers/buyerController");
const {ml_model} = require("../ml_model/crop_recommendation/test");
const {postQuery,getQuery,deleteQuery,updateQuery,againPostQuery,
postMeet,getSpecificQuery,getMeet,acceptQuery,acceptNewScheduleMeet,
notAcceptNewScheduleMeet}=require("../controllers/farmerControllers");
const {getQueries,responseQuery,getMeets,acceptMeetByNGO, changeOfTime} =require("../controllers/ngoControllers");
const { token } = require("morgan");
const { getSales } = require('../controllers/sellerControllers');

router.post("/login", login,createToken);
router.post("/signup", validateUserProfile, signup);
router.get("/testJWT",tokenAuth,sessionCheck,testJWT);
router.get("/logout",tokenAuth,sessionDelete,logout);
router.get("/buyer/products/:marketID", tokenAuth,sessionCheck,getProducts);
router.post("/ml_model/crop_recomendation",ml_model);
router.post("/logoutAll",logoutAll);
router.get("/profile",tokenAuth,sessionCheck,profile);

//N Pages

//Queries
router.post("/postquery",tokenAuth,sessionCheck,validateFarmerQuery,postQuery);
router.get("/getquery/:id",tokenAuth,sessionCheck,getSpecificQuery);
router.get("/getquery",tokenAuth,sessionCheck,getQuery);
router.delete("/deletequery/:id",tokenAuth,sessionCheck,deleteQuery);
router.put("/editquery",tokenAuth,sessionCheck,validateFarmerQuery,updateQuery);
router.put("/againpostquery",tokenAuth,sessionCheck,validateFarmerQuery,againPostQuery);
router.put("/acceptquery/:id",tokenAuth,sessionCheck,acceptQuery);
router.get("/getqueries",tokenAuth,sessionCheck,getQueries);
router.put("/respondquery",tokenAuth,sessionCheck,responseQuery);

//Meet
router.post("/postmeet",tokenAuth,sessionCheck,validateFarmerMeet,postMeet);
router.get("/getmeet",tokenAuth,sessionCheck,getMeet);
router.get("/getmeets",tokenAuth,sessionCheck,getMeets);
router.patch("/acceptmeetbyngo/:id",tokenAuth,sessionCheck,acceptMeetByNGO);
router.put("/changeofschedule/:id",tokenAuth,sessionCheck,changeOfTime);
router.patch("/acceptmeetbyfarmer/:id",tokenAuth,sessionCheck,acceptNewScheduleMeet);
router.patch("/notacceptmeetbyfarmer/:id",tokenAuth,sessionCheck,notAcceptNewScheduleMeet);

// M 
router.get("/getmarkets", tokenAuth, sessionCheck, getMarkets);
router.get("/getsales", tokenAuth, sessionCheck, getSales);
router.get("/getdeals", tokenAuth, sessionCheck, getDeals);
router.get("/gettransactions", tokenAuth, sessionCheck, getTransactions);
router.post("/postrequest", tokenAuth, sessionCheck, postRequest);
router.get("/getmarkets", tokenAuth, sessionCheck, getMarkets);
// OVER - M10, M15, M17, M18
module.exports = router;