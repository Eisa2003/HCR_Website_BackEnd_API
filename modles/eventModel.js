const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add the event title"],
  },
  desc: {
    type: String,
    required: [true, "Please add the event description"],
  },
  date: {
    type: Date,
    required: [true, "Please add the event date"],
  },
  address: {
    type: String,
    required: [true, "Please add the event address"],
  },
}, { timestamps: true }); // end Schema design

// Naming the model Event and the schema is eventSchema
module.exports = mongoose.model("Event", eventSchema);
