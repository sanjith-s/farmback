const express = require("express");
const router = express.Router();
const { login,signup } = require("../controllers/controller");
router.get("/login/:email/:password", login);
router.post("/signup", signup);
module.exports = router;