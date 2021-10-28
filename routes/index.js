const express = require("express");

const app = express();

const authRoute = require("./Routes/auth");
const profileInfo = require("./Routes/profileInfo.js");

app.use("/auth", authRoute);
app.use("/info", profileInfo);

module.exports;
