const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const AmenitiesSchema = new Schema(
    {
        house_id: {type: Types.ObjectId, required: true, ref: "House"}
    }
);

const Amenities = mongoose.model("Amenities", AmenitiesSchema);
module.exports = { Amenities };