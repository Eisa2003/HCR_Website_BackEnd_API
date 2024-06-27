const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, currentAdmin } = require("../controllers/adminController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerAdmin)

router.post("/login", loginAdmin)

router.get("/current", validateToken, currentAdmin) // first middleware to be executed is itself,
                                                   // then validateToken and at last currentAdmin

module.exports = router;