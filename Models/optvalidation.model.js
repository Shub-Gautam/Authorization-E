const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const otpSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    require: true,
  },
  phoneNo: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("otp", otpSchema);
