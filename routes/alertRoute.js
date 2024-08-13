const express = require("express");
const router = express.Router();
const { updateAlert, getAlert } = require("../controllers/alertController");
const validateToken = require("../middleware/validateTokenHandler");

router.route('/:id').put(updateAlert) // first middleware to be executed is itself,
                                                   // then validateToken and at last updateAlert

router.route('/').get(getAlert)

module.exports = router;