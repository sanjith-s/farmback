const express = require("express");
const router = express.Router();
const { login,signup } = require("../controllers/controller");
const {validateUserProfile}=require("../validations/userValidation");
router.get("/login/:email/:password", login);
router.post("/signup", validateUserProfile, signup);
module.exports = router;