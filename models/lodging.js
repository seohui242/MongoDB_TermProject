const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const LodgingSchema = new Schema(
    {
        city: {type: Number, required: true},
        street: { type: String, required: true },
        zip_code: { type: String, required: true },
        check_in: { type: Date, required: true },
        check_out: { type: Date, required: true },
        introduction: { type: String, required: true },
        name: { type: String, required: true },
        discount_policy_id: { type: Types.ObjectId, required: false },
        base_id: { type: Types.ObjectId, required: true , ref: "Host"},
        house_id: { type: Types.ObjectId, required: true , ref: "House"},
        rate_policy_id: { type: Types.ObjectId, required: true , ref: "RatePolicy"},
    }
);

const Lodging = mongoose.model("Lodging", LodgingSchema);
module.exports = { Lodging };