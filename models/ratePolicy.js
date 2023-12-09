const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const RatePolicySchema = new Schema(
    {
        day_rate: {type:Number},
        week_rate: {type:Number}
    }
);

const RatePolicy = mongoose.model("RatePolicy", RatePolicySchema);
module.exports = { RatePolicy };