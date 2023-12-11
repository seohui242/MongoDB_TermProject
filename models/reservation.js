const {Schema, model, Types} = require("mongoose");

const ReservationSchema = new Schema(
    {
        user                : {type: Types.ObjectId, required: true, ref: "User"},
        accommodation       : {type: Types.ObjectId, required: true, ref: "Accommodation"},
        count               : {type: Number, required: true},
        checkIn             : {type: Date, required: true},
        checkOut            : {type: Date, required: true},
        status              : {type: String, enum: ["예약", "취소", "완료", "체크인"], required: true},
        price               : {type: Number, required: true},
        starRate            : {type: Number},
        review              : {type: String},
    },
);
const Reservation = model("Reservation", ReservationSchema);

module.exports = {Reservation};
