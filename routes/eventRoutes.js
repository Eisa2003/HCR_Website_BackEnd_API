const express = require("express");
const router = express.Router();
const {getEvents, createEvent, getEventFor, updateEvent, deleteEvent} = require("../controllers/eventController");

// get - for retrieving data
// post - for creating new data
// put - for updating the existing data | And delete is obvious

router.route('/').get(getEvents).post(createEvent) // The paths are combined which means
                                  // the base path: from index.js and +
                                  // the relative path: from this files

router.route('/:id').get(getEventFor).put(updateEvent).delete(deleteEvent) // through .params you can access the paramaters passed with the request

module.exports = router;