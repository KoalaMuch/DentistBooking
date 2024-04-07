const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  dentist: {
    type: mongoose.Schema.ObjectId,
    ref: "Dentist",
    required: true,
  },
  rating: {
    type: Number,
    require: [true, "Please add a rating"],
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, "Please add a comment"],
  },
});
module.exports = mongoose.model("Review", DentistSchema);
