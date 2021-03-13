const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExcerciseSchema = new Schema({
  type: String,
  name: {
    type: String
  },
  duration: {
    type: Number
  },
  weight: {
    type: Number
  },
  reps: {
    type: Number
  },
  sets: {
    type: Number
  }
});

const Excercise = mongoose.model("Type", ExcerciseSchema);

module.exports = Excercise;