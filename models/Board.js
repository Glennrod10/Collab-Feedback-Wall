const mongoose = require("mongoose");
const BoardSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    trim:true
  },
  description:{
    type:String,
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  collaborators:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  }]

} ,{timestamps:true});
module.exports = mongoose.model("Board" ,BoardSchema)