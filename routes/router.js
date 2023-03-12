const express = require("express");
const router = express.Router();
const {login,signup,testJWT,logout} = require("../controllers/controller");
const {validateUserProfile}=require("../validations/userValidation");
const {tokenAuth}= require('../middlewares/tokenAuth');
const {createToken,sessionCheck,sessionDelete}=require("../controllers/user");
const {uploadFiles, getListFiles, download} = require("../controllers/upload")

router.get("/login/:email/:password", createToken,login);
router.post("/signup", validateUserProfile, signup);
router.get("/testJWT",tokenAuth,sessionCheck,testJWT);
router.get("/logout",tokenAuth,sessionDelete,logout);

router.post("/upload", uploadFiles);
router.get("/files", getListFiles);
router.get("/files/:name", download);

module.exports = router;