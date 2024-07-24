const asyncHandler = require("express-async-handler")
const Resource = require("../models/resourceModel")
const Admin = require("../models/adminModel")

//@desc Get all resources
//@route GET /api/resources
//@access public
const getResources = asyncHandler(
    async (req, res) => {
        const resources = await Resource.find(); // Waiting for a promise to be settled
        res.status(200).json(resources); // 200: ok response
    }
)

//@desc Get all the resources for admin's access for those resources
//@route GET /api/adminResources
//@access private
const getAdminResources = asyncHandler(
    async (req, res) => {
        const resources = await Resource.find(); // Waiting for a promise to be settled
        res.status(200).json(resources); // 200: ok response
    }
)

//@desc Create new resource
//@route POST /api/resources
//@access private
const createResource = asyncHandler(
    async (req, res) => {
        // console.log("The request body is: ", req.body);
        const authAdmin = await Admin.findById(req.admin.id)
        if (!authAdmin) {
            res.status(401);
            throw new Error("Admin not authorized")
        }
        const { title, resourceName, imageUrl } = req.body; // Destructuring
        if (!title || !resourceName ||  !imageUrl) {
            res.status(400);
            throw new Error("All fields are mandatory")
        }
        const resource = await Resource.create({ // returns a promise and created document in the schema format
            title, // Since key and the value have same name, We can simply
            resource, // put just one instance of each
            imageUrl,
            address,
            phone,
            contactName,
            website,
            email,
            mission,
            approach,
            hoursOfOperation,
            locations,
            socialMedia,
            additionalInfo,
            
        })
        res.status(200).json({ resource });
    }
)

//@desc Get resource for (using id)
//@route GET /api/resources/:id (params)
//@access public
const getResourceFor = asyncHandler(
    async (req, res) => {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            res.status(404);
            throw new Error("resource not found");
        }
        res.status(200).json({ resource });
    }
)

//@desc update resource
//@route PUT /api/resources/:id
//@access private
const updateResource = asyncHandler(
    async (req, res) => {
        const authAdmin = await Admin.findById(req.admin.id)
        if (!authAdmin) {
            res.status(401);
            throw new Error("Admin not authorized")
        }

        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            res.status(404);
            throw new Error("Resource not found");
        }

        /*
        if(resource.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User cannot change another users resource information")
        }*/

        const updatedResource = await Resource.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json(updatedResource);
    }
)

//@desc Get all resources
//@route DELETE /api/resources/:id
//@access private
const deleteResource = asyncHandler(
    async (req, res) => {
        const authAdmin = await Admin.findById(req.admin.id)
        if (!authAdmin) {
            res.status(401);
            throw new Error("Admin not authorized")
        }

        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            res.status(404);
            throw new Error("Resource not found");
        }

        /* For future use
        if(contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User cannot change another users contact information")
        }*/

        await Resource.deleteOne({ _id: req.params.id });
        res.status(200).json(resource);
    }
)

module.exports = { getResources, getAdminResources, createResource, getResourceFor, updateResource, deleteResource }
