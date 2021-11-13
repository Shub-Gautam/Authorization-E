const router = require("express").Router();

// Importing Controllers
const { savePlaceApi } = require("../Controllers/apiControllers/savePlaces");

router.post("/save-places", savePlaceApi);

module.exports = router;
