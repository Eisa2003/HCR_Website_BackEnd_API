const asyncHandler = require("express-async-handler")
const Event = require("../models/eventModel")

//@desc Get all events
//@route GET /api/events
//@access public
const getEvents = asyncHandler(
    async (req, res) =>{
        const events = await Event.find(); // Waiting for a promise to be settled
        res.status(200).json(events); // 200: ok response
    }
)

//@desc Create new event
//@route POST /api/events
//@access public
const createEvent = asyncHandler(
    async (req, res) =>{
        console.log("The request body is: ", req.body);
        const { title, desc, date, address, imageUrl } = req.body; // Destructuring
        if (!title || !desc || !date || !address || !imageUrl) {
            res.status(400);
            throw new Error("All fields are mandatory")
        }
        const event = await Event.create({ // returns a promise and created document in the schema format
            title, // Since key and the value have same name, We can simply
            desc, // put just one instance of each
            date,
            address,
            imageUrl
        })
        res.status(200).json({ event });
    }
)

//@desc Get event for (using id)
//@route GET /api/events/:id (params)
//@access public
const getEventFor = asyncHandler(
    async (req, res) =>{
        const event = await Event.findById(req.params.id);
        if(!event) {
            res.status(404);
            throw new Error("event not found");
        }
        res.status(200).json({ event });
    }
)

//@desc update event
//@route PUT /api/events/:id
//@access public
const updateEvent = asyncHandler(
    async (req, res) =>{
        const event = await Event.findById(req.params.id);
        if(!event) {
            res.status(404);
            throw new Error("Event not found");
        }

        /*
        if(event.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User cannot change another users event information")
        }*/

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.status(200).json( updatedEvent );
    }
)

//@desc Get all events
//@route DELETE /api/events/:id
//@access public
const deleteEvent = asyncHandler(
    async (req, res) =>{
        const event = await Event.findById(req.params.id);
        if(!event) {
            res.status(404);
            throw new Error("Event not found");
        }

        /* For future use
        if(contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("User cannot change another users contact information")
        }*/

        await Event.deleteOne({ _id: req.params.id });
        res.status(200).json( event );
    }
)

module.exports = { getEvents, createEvent, getEventFor, updateEvent, deleteEvent }
