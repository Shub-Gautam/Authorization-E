"use strict";

const express = require("express");
const createError = require("http-errors");

const authRoute = require("./routes/auth");
const profileInfo = require("./routes/profileInfo.js");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for Register,Verification,login,logout
app.use("/auth", authRoute);
// Route for getting profileinfo, updating profile
app.use("/info", profileInfo);

app.use("/register", require("./routes/Register"));
app.use("/verify", require("./routes/VerifyMail"));
app.use("/login", require("./routes/Login"));
app.use("/profile", require("./routes/GetProfile"));
app.use("/update", require("./routes/ProfileUpdate"));
// app.use("/logout", require("./routes/Logout"));

// Handeling all the other requests
app.use(async (req, res, next) => {
  // const err = new Error("Not Found");
  // err.status(404);
  next(createError.NotFound("This route doesn't exist"));
});

app.use(async (err, req, res, next) => {
  res.status = err.status || 500;
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
