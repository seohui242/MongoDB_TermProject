const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const HostSchema = new Schema(
    {
        base_id: {type: String, required : true},
        name: { type: String, required: true },
        age: {type: Number, required: true},
        lodging_id: {type: Types.ObjectId, required: true, ref: "Lodging"}
    }
);

const Host = mongoose.model("Host", HostSchema);
module.exports = { Host };