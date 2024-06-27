const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: [true, "Please add the admin name"]
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the admin password"]
    }
}, {
    timestamps: true
}
)

// Naming the model/The Collection/Table as admin
module.exports = mongoose.model("Admin", adminSchema)