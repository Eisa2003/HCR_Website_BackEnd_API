const asyncHandler = require("express-async-handler")
const Admin = require("../models/adminModel")
const Alert = require("../models/alertModel")

//@desc Get all events
//@route GET /api/events
//@access public
const getAlert = asyncHandler(
    async (req, res) => {
        const events = await Alert.findById('66b9102792d7f3bb396d886c'); // Waiting for a promise to be settled
        res.status(200).json(events); // 200: ok response
    }
)

//@desc update alert
//@route PUT /api/alerts/:id
//@access private
const updateAlert = asyncHandler(
    async (req, res) => {
        const authAdmin = await Admin.findById(req.admin.id) // req.admin is from the token middleware
        if (!authAdmin) {
            res.status(401);
            throw new Error("Admin not authorized")
        }

        const alert = await Alert.findById('66b9102792d7f3bb396d886c');
        if (!alert) {
            res.status(404);
            throw new Error("Alert not found");
        }

        /*
        if(alert.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User cannot change another users alert information")
        }*/

        const updatedAlert = await Alert.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json(updatedAlert);
    }
)

module.exports = { updateAlert, getAlert }