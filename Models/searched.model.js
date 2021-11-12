const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const searched = new Schema(
  {
    lat_lng: {
      type: [Number],
      require: true,
    },
    keyword: {
      type: String,
      require: true,
    },
    lastUpdated: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("searched", searched);
