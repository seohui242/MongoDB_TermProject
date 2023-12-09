const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const AccessiblityAmenitiesListSchema = new Schema(
    {
        amenity:{type:String}
    }
);

const AccessiblityAmenitiesList = mongoose.model("AccessiblityAmenitiesList", AccessiblityAmenitiesListSchema);
module.exports = { AccessiblityAmenitiesList };