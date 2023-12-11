const {Schema, model, Types} = require("mongoose");

const UserSchema = new Schema(
    {
        name    : {type: String, required: true},
        age     : Number
    }
);
const User = model("User", UserSchema);

module.exports = {User};
