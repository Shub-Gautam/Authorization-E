const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: false,
      unique: true,
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
    },
    phoneNo: {
      type: String,
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
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// userschema.post("save", async function (next) {
//   try {
//     console.log("called after saving a user");
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = mongoose.model("user", userSchema);
