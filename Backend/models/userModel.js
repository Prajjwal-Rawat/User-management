const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  hobbies: {
    type: [String],
    default: [],
    required:true
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;