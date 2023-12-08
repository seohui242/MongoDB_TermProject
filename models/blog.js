const {Schema, model, Types} = require("mongoose");

const BolgSchema = new Schema(
    {
        title:{type:String, required:true},
        content:{type:String, required:true},
        member:{type:Types.ObjectId, required:true, ref:"Member"},
    }, 
    {timestamps:true}
);

const Blog = model("Blog",BolgSchema);
module.exports = {Blog};



