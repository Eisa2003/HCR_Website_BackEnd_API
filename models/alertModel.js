const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add the alert title"],
    },
    message: {
        type: String,
        required: [true, "Please add the alert message"],
    }
}, { timestamps: true }); // end Schema design

// Naming the model Alert and the schema is resourceSchema
module.exports = mongoose.model("Alert", alertSchema);
