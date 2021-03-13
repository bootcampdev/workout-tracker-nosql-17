const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date
  },    
  excercises: [
      {
        // type: Schema.Types.ObjectId,
        // ref: "Excercise"
        type: {
          type: String
        },
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
        stats: {
          type: Number
        }
      }
    ]
  });
  
  const Workout = mongoose.model("Workout", WorkoutSchema);
  
  module.exports = Workout;
  