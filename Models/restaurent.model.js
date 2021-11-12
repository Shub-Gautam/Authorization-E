const { string } = require("@hapi/joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const resSchema = new Schema({
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const resSchema = new mongoose.Schema({
  place_id: {
    type: String,
    required: true,
  },
  location: {
    type: pointSchema,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
    default: 0,
  },
  address: {
    type: String, //use formated string
  },
  phoneNo: {
    type: String,
  },
  photos: {
    type: [String],
  },
});

module.exports = mongoose.model("restaurent", resSchema);

// db.find($and:[{
//   lat : $gt min_lat,
//   lng : $gt min_lng
// },{
//   lat : $lt max_lat,
//   lng : $lt max_lng
// }])
