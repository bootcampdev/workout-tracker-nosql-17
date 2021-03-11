const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  type: String
});

const Type = mongoose.model("Type", TypeSchema);

module.exports = Type;