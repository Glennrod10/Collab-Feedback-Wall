const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema({
  board:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Board",
    required:true
  },
  content:{
    type:String,
    required:true,
    trim:true
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }

} ,{timestamps:true});

module.exports = mongoose.model("Note" , NoteSchema);