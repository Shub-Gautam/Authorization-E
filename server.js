"use strict";

const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.json());

app.use("/register", require("./routes/Register"));
app.use("/verify", require("./routes/VerifyMail"));
app.use("/profile", require("./routes/GetProfile"));
app.use("/update", require("./routes/ProfileUpdate"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
