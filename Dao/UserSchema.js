const mongoose = require("mongoose");
const bcrypt = require("brcypt");

const Schema = mongoose.Schema;

const userschema = new Schema(
  {
    UserID: {
      type: String,
      required: true,
    },
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
      lowercase: true,
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

userschema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userschema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password); // return boolean
  } catch (err) {
    throw err;
  }
};

// userschema.post("save", async function (next) {
//   try {
//     console.log("called after saving a user");
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = mongoose.model("user", userschema);
