const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
    name: {
      type: String,
      trim: true,
      required: "Name of excercise is required"
    },
    weight: {
        type: Number
      },
      sets: {
        type: Number
      },
      reps: {
        type: Number
      },
      duration: {
        type: String
      },
      resistanceDuration: {
        type: String
      },
      distance: {
        type: Number
      },
    workoutType: [
      {
        type: Schema.Types.ObjectId,
        ref: "Type"
      }
    ]
  });
  
  const Routine = mongoose.model("Routine", RoutineSchema);
  
  module.exports = Routine;
  