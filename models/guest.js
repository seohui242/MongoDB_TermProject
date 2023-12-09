const mongoose = require("mongoose");
const { Schema } = mongoose;

const GuestSchema = new Schema(
    {
        base_id: {type: String, required : true},
        age: {type: Number, required: true},
        name: { type: String, required: true }
    }
);

const Guest = mongoose.model("Guest", GuestSchema);
module.exports = { Guest };