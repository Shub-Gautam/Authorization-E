const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userschema = new Schema(
  {
    RegType: {
      type: String,
      required: true,
    },
    FName: {
      type: String,
      required: true,
    },
    LName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    PhoneNo: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    VMethod: {
      type: String,
      required: false,
    },
    VStatus: {
      type: Boolean,
      required: true,
    },
    UPhoto: {
      type: String,
      required: true,
    },
    UCreated: {
      type: Date,
      required: true,
    },
    uniqueString: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userschema);
