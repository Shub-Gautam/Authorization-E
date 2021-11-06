const router = require("express").Router();

// Importing Controllers
const { savePlaceApi } = require("../Controllers/apiControllers/savePlaces");

router.post(
  "/save-places",
  (req, res, next) => {
    console.log("hey");
    next();
  },
  savePlaceApi
);

router.post("h", (req, res) => {
  console.log("yo");
});

module.exports = router;
