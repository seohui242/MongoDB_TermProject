const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const BasicAmenitiesListSchema = new Schema(
    {
        amenity:{type:String}
    }
);

const BasicAmenitiesList = mongoose.model("BasicAmenitiesList", BasicAmenitiesListSchema);
module.exports = { BasicAmenitiesList };