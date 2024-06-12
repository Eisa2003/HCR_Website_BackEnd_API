const asyncHandler = require("express-async-handler")
const Event = require("../modles/eventModel")

//@desc Get all events
//@route GET /api/events
//@access public
const getEvents = asyncHandler(
    async (req, res) =>{
        res.status(200).json({message: "All events"})
    }
)

//@desc Create new event
//@route POST /api/events
//@access public
const createEvent = asyncHandler(
    async (req, res) =>{
        res.status(200).json({message: "created an event"})
    }
)

//@desc Get event for (using id)
//@route GET /api/events/:id (params)
//@access public
const getEventFor = asyncHandler(
    async (req, res) =>{
        res.status(200).json({message: `This is the event with id: ${req.params.id}`})
    }
)

//@desc update event
//@route PUT /api/events/:id
//@access public
const updateEvent = asyncHandler(
    async (req, res) =>{
        res.status(200).json({message: `Updated event with the id: ${req.params.id}`})
    }
)

//@desc Get all events
//@route DELETE /api/events/:id
//@access public
const deleteEvent = asyncHandler(
    async (req, res) =>{
        res.status(200).json({message: `deleted event with the id: ${req.params.id}`})
    }
)

module.exports = { getEvents, createEvent, getEventFor, updateEvent, deleteEvent }
