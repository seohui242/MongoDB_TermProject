const {Schema, model, Types} = require("mongoose");

const UserSchema = new Schema(
    {
        name    : {type: String, required: true},
    }
);
const User = model("User", UserSchema);

module.exports = {User};
