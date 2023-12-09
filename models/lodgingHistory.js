const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const LodgingHistorySchema = new Schema(
    {
        check_in: {type: Date, required: true },
        check_out: {type: Date, required: true},
        is_check: {type: Boolean, required: true},
        person: {type:Number, required: true},
        state: {type:String, enum: ['예약완료','예약취소'], required : true},
        total_price: {type:Number},
        base_id: {type:Types.ObjectId, required: true, ref: "Guest"},
        lodging_id: {type:Types.ObjectId, required: true, ref: "Lodging"},
        review_id: {type:Types.ObjectId, required: true, ref: "Review"}
    }
);

const LodgingHistory = mongoose.model("LodgingHistory", LodgingHistorySchema);
module.exports = { LodgingHistory };