const {Schema, model, Types} = require("mongoose");

const AccommodationSchema = new Schema(
    {
        name                : {type: String, required: true},
        address             : {
            city    : String,
            street  : String,
            zipCode : String,
        },
        accommodationType   : {type: String, enum: ["개인", "전체"], required: true},
        amenity             : {type: [String], required: true},
        capacity            : {type: Number, require: true},
        weekdayPrice        : {type: Number, required: true},
        weekendPrice        : {type: Number, required: true},
    },
);
const Accommodation = model("Accommodation", AccommodationSchema);

module.exports = {Accommodation};
