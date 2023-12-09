const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const ReviewSchema = new Schema(
    {
        comment :{type: String},
        star_point :{type:Number, required: true},
        history_id :{type:Types.ObjectId, required: true, ref:"History"}
    }
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = { Review };