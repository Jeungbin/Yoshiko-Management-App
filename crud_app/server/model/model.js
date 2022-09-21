const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: { type: String },
  phoneNum: { type: Number },
  classDate: {
    type: Array,
    default: [],
  },
  startDate: { type: Date },
  classTimeZone: { type: String },
  classTime: {
    type: Array,
    default: [],
  },
  teacher: { type: String },
});

const Userdb = mongoose.model("userdb", schema);

module.exports = Userdb;
