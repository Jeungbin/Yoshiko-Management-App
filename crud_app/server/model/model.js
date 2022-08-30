const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: { type: String },
  phoneNum: { type: Number },
  classDate: [{ type: String }],
  startDate: { type: Date },
  classTimeZone: { type: String },
  classTime: [{ type: Number }],
  teacher: { type: String },
});

const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;
