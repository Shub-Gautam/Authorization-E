const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    regType: {
      type: String,
      required: true,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
      unique: true,
    },
    phoneNo: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    vMethod: {
      type: String,
      required: false,
    },
    vStatus: {
      type: Boolean,
      default: false,
    },
    uPhoto: {
      type: String,
      required: true,
    },
    uniqueString: {
      type: String,
      required: false,
    },
    otp: {
      type: Number,
      require: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.isValidPassword = async function (password) {
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

module.exports = mongoose.model("user", userSchema);
