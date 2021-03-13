// neccessary modules

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3003;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


// html route from api.js (browser fetch request)
//

// find last or one workout in dbs
//

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(data => {
      console.log("finding one", data);
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    })
})

//
// create a workout id and store in dbs, the excercise object is empty
// {body} same as req and req.bdoy

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(data => {
      console.log("new wrkout = ", data);
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    })
})

//
// update an excercise, the id for the new excercise has already
// been created, so really we are just doing an update

app.put("/api/workouts/:id", (req, res) => {
  console.log(req.body);

  const id = req.params.id;
  const newExcercise = { exercises: req.body }; // this has too many brackets
  const filter = { id: req.params.id };

  console.log(id);
  console.log("new excercise: ", newExcercise);

  db.Workout.findByIdAndUpdate(id, { $push: { exercises: req.body } }, { new: true })
    //db.Workout.findByIdAndUpdate(filter,  { $push: newExcercise}, {new: true})  
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    })
})

app.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
        totalDistance: { $sum: "$exercises.distance" }
      }
    }
  ])
  .then(data => {
    console.log("aggreatation: ", data);
     res.json(data);
  })
  .catch(err => {
      res.json(err);
  })
})


app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"))
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"))
})

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});