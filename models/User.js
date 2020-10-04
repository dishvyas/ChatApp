var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const registerSchema = new Schema({
    name: String,
    email: String,
    password: String,
    type: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model(
    "register",
    registerSchema,
    "registrationDetails"
);
