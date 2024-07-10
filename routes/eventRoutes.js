const express = require("express");
const router = express.Router();
const {getEvents, getAdminEvents,createEvent, getEventFor, updateEvent, deleteEvent} = require("../controllers/eventController");
const validateToken = require("../middleware/validateTokenHandler");

// get - for retrieving data
// post - for creating new data
// put - for updating the existing data | And delete is obvious

router.route('/').get(getEvents).post(validateToken, createEvent) // The paths are combined which means
                                  // the base path: from index.js and +
                                  // the relative path: from this files

router.route('/admin').get(validateToken, getAdminEvents); // This route is for the admin controls for the events

router.route('/:id').get(getEventFor).put(validateToken, updateEvent).delete(validateToken, deleteEvent) // through .params you can access the paramaters passed with the request

module.exports = router;