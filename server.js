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

// db.Workout.create({ day: Date.now })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

console.log("dir name: ",__dirname);
console.log("path: ",path.join(__dirname, "public", "exercise.html"))

// html route from api.js (browser fetch request)
//

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then (data => {
      res.json(data);
    })
    .catch (err => {
      res.json(err);
    })
})

//
// add an excercise
// {body} same as req and req.bdoy

app.post("/api/workouts", ({body}, res) => {
  db.Workout.create(body)
    .then (data => {
      console.log("new wrkout = ", data);
      res.json(data);
    })
    .catch (err => {
      res.json(err);
    })
})

//
// update an excercise
//tobedone
app.put("/api/workouts:id", (req, res) => {
  db.Workout.find({})
    .then (data => {
      res.json(data);
    })
    .catch (err => {
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