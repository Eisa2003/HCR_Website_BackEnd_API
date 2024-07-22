const express = require("express");
const router = express.Router();
const {getResources, getAdminResources, createResource, getResourceFor, updateResource, deleteResource} = require("../controllers/resourceController");
const validateToken = require("../middleware/validateTokenHandler");

// get - for retrieving data
// post - for creating new data
// put - for updating the existing data | And delete is obvious

router.route('/').get(getResources).post(validateToken, createResource) // The paths are combined which means
                                  // the base path: from index.js and +
                                  // the relative path: from this files

router.route('/admin').get(validateToken, getAdminResources); // This route is for the admin controls for the events

router.route('/:id').get(getResourceFor).put(validateToken, updateResource).delete(validateToken, deleteResource) // through .params you can access the paramaters passed with the request

module.exports = router;