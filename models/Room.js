const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const RoomSchema = new Schema(
    {
        room_id: {type: String, required : true},
        room_book: { type: Boolean, required: true },
        house_id: {type: Types.ObjectId, required: true, ref: "House"}
    }
);

const Room = mongoose.model("Room", RoomSchema);
module.exports = { Room };