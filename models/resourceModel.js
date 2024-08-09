const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    resource: {
        type: String,
        required: [true, "Please add the resource database name"],
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
        type: [String], 
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
    }, // not being used right now
    hoursOfOperation: {
        type: [String],
    },
    locations: {
        type: [String],
    },
    socialMedia: {
        type: [String],
    },
    additionalInfo: {
        type: String,
    },
    resourceName: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // end Schema design

// Naming the model Resource and the schema is resourceSchema
module.exports = mongoose.model("Resource", resourceSchema);
