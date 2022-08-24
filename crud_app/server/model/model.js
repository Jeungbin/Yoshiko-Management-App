const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: String,
  phoneNum: Number,
  classDate: String,
  startDate: Date,
  teacher: String,
});

const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;
