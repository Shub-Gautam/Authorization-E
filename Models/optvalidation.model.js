const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const otpSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

module.exports = mongoose.model("otp", otpSchema);
