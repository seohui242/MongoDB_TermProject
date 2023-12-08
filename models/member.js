const mongoose = require("mongoose");
const { Schema } = mongoose;
const MemberSchema = new Schema(
    { // 스키마에 대한 정의
        name: { type: String, required: true },
        age: Number, //age:{type:Number}
        address: {
            city: String,
            street: String,
            zipCode: String,
        },
    }, // 옵션
    { timestamps: true }
);
const Member = mongoose.model("Member", MemberSchema);
module.exports = { Member };