const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    resource: {
        type: String,
        required: [true, "Please add the resource title"],
    },
    title: {
        type: String,
        required: [true, "Please add the resource title"],
    },
    imageUrl: {
        type: String,
    },
    address: {
        type: String, 
    },
    phone: {
        type: [
            {
                type: String, 
            },
        ], // This is an array of objects
    },
    contactName: {
        type: [String],// An array of strings
    },
    website: {
        type: [String],
    },
    email: {
        type: [String],
    },
    mission: {
        type: String,
    },
    approach: {
        type: String,
    },
    services: {
        type: [String],
    },
    hoursOfOperation: {
        type: [String],
    },
    locations: {
        type: [{
            // Define location schema here if needed (e.g., address, coordinates)
            type: String,
        }],
    },
    socialMedia: {
        type: [{
            name: {
                type: String,
                required: true,
            },
            link: {
                type: String,
                required: true,
            },
        }],
    },
    additionalInfo: {
        type: String,
    },
}, { timestamps: true }); // end Schema design

// Naming the model Resource and the schema is resourceSchema
module.exports = mongoose.model("Resource", resourceSchema);
