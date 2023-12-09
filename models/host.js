const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const HostSchema = new Schema(
    {
        name: { type: String, required: true },
        age: {type: Number, required: true},
        lodging_id: {type: Types.ObjectId, required: true, ref: "Lodging"}
    }
);

const Host = mongoose.model("Host", HostSchema);
module.exports = { Host };