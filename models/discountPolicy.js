const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const DiscountPolicysSchema = new Schema(
    {
        end_date:{type:Date},
        quantity:{type:Number},
        rate:{type:Number},
        start_date:{type:Date}
    }
);

const DiscountPolicy = mongoose.model("DiscountPolicy", DiscountPolicysSchema);
module.exports = { DiscountPolicy };