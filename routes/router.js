const express = require("express");
const router = express.Router();

const {login,signup,testJWT,logout,profile} = require("../controllers/controller");
const {validateUserProfile}=require("../validations/userValidation");
const {validateFarmerQuery,validateFarmerMeet}=require("../validations/farmerValidation");
const {tokenAuth}= require('../middlewares/tokenAuth');
const {createToken,sessionCheck,sessionDelete,logoutAll}=require("../controllers/user");
const {getMarkets,getProducts, getDeals, getTransactions, postRequest, loadNotifications, loadOrders} = require("../controllers/buyerController");
const {ml_model_crop} = require("../ml_model/crop_recommendation/test");
const {ml_model_web1} = require("../ml_model/web_scrapping/test1");
const {ml_model_web2} = require("../ml_model/web_scrapping/test2");
const {ml_model_web3} = require("../ml_model/web_scrapping/test3");
const {ml_model_web4} = require("../ml_model/web_scrapping/test4");
const {postQuery,getQuery,deleteQuery,updateQuery,againPostQuery,
postMeet,getSpecificQuery,getMeet,acceptQuery,acceptNewScheduleMeet,
notAcceptNewScheduleMeet}=require("../controllers/farmerControllers");
const {getQueries,responseQuery,getMeets,acceptMeetByNGO, changeOfTime} =require("../controllers/ngoControllers");
const { token } = require("morgan");
const { getSales, getSellerProducts, getPastSales } = require('../controllers/sellerControllers');
// const { getSales } = require('../controllers/sellerControllers');
const { uploadFiles, getListFiles, download } = require('../controllers/upload');
const { uploadFile, getFiles } = require('../controllers/trialImage');
const { webhookHandler, makePayment } = require("../controllers/paymentController");


router.post("/login", login, createToken);
router.post("/signup", validateUserProfile, signup);
router.get("/testJWT",tokenAuth,sessionCheck,testJWT);
router.get("/logout",tokenAuth,sessionDelete,logout);
router.get("/buyer/products/:marketID", tokenAuth,sessionCheck,getProducts);
router.get("/ml_model/webscrapping/vegetable_price",ml_model_web1);
router.get("/ml_model/webscrapping/fruits_price",ml_model_web2);
router.get("/ml_model/webscrapping/spinach_greens_price",ml_model_web3);
router.get("/ml_model/webscrapping/rice_dal_price_chennai",ml_model_web4);
router.post("/ml_model/crop_recomendation",ml_model_crop);
router.post("/logoutAll",logoutAll);
router.get("/profile",tokenAuth,sessionCheck,profile);

//N Pages

//Queries
router.post("/postquery", tokenAuth, sessionCheck, validateFarmerQuery, postQuery);
router.get("/getquery/:id", tokenAuth, sessionCheck, getSpecificQuery);
router.get("/getquery", tokenAuth, sessionCheck, getQuery);
router.delete("/deletequery/:id", tokenAuth, sessionCheck, deleteQuery);
router.put("/editquery", tokenAuth, sessionCheck, validateFarmerQuery, updateQuery);
router.put("/againpostquery", tokenAuth, sessionCheck, validateFarmerQuery, againPostQuery);
router.put("/acceptquery/:id", tokenAuth, sessionCheck, acceptQuery);
router.get("/getqueries", tokenAuth, sessionCheck, getQueries);
router.put("/respondquery", tokenAuth, sessionCheck, responseQuery);

//Meet
router.post("/postmeet", tokenAuth, sessionCheck, validateFarmerMeet, postMeet);
router.get("/getmeet", tokenAuth, sessionCheck, getMeet);
router.get("/getmeets", tokenAuth, sessionCheck, getMeets);
router.patch("/acceptmeetbyngo/:id", tokenAuth, sessionCheck, acceptMeetByNGO);
router.put("/changeofschedule/:id", tokenAuth, sessionCheck, changeOfTime);
router.patch("/acceptmeetbyfarmer/:id", tokenAuth, sessionCheck, acceptNewScheduleMeet);
router.patch("/notacceptmeetbyfarmer/:id", tokenAuth, sessionCheck, notAcceptNewScheduleMeet);

// M 

//  Buyer Routes
router.get("/buyer/getmarkets", tokenAuth, sessionCheck, getMarkets);
router.get("/buyer/getdeals", tokenAuth, sessionCheck, getDeals);
router.get("/buyer/gettransactions", tokenAuth, sessionCheck, getTransactions);
router.post("/buyer/postrequest", tokenAuth, sessionCheck, postRequest);

// Seller Routes
router.get("/seller/getsales", tokenAuth, sessionCheck, getSales);
router.get("/seller/getsellerproducts", tokenAuth, sessionCheck, getSellerProducts);
router.get("/loadnotifications", tokenAuth, sessionCheck, loadNotifications);
router.get("/loadorders", tokenAuth, sessionCheck, loadOrders);
router.get("/seller/pastsales", tokenAuth, sessionCheck, getPastSales);
// OVER - M10, M15, M17, M18, M6, 


//File handling
router.post("/upload", uploadFiles);
router.get("/files", getListFiles);
router.get("/files/:name", download);

//Trial File Handling
router.post("/uploadFile", uploadFile);
router.get("/getFiles", getFiles);


//Payments
router.post("/createPayment", makePayment);


module.exports = router;