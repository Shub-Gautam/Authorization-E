// 28.632631, 77.212819

const axios = require("axios");
const {
  getPlaceInfo,
  getPlacePhotos,
} = require("../../Utils/place_apis_helpers");
const resCodes = require("../../Constants/response.constants");
const resMsg = require("../../Constants/response.messages");
const restaurents = require("../../Models/restaurent.model");

const savePlaceApi = async (req, res, next) => {
  try {
    // Joi Validate
    const { location, keyword } = req.query;
    // Get nearby place
    const google_api_key = process.env.GOOGLE_PLACES_API_KEY;
    const lat_lng = `${location}`.split(",");
    let type = keyword;

    console.log(location, keyword);

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat_lng[0]}%2C${lat_lng[1]}&radius=1500&keyword=${type}&key=${google_api_key}`
    );
    const resultArr = data.results;

    // iterate through each object
    resultArr.map(async (value) => {
      // Check for same object
      const doesExist = await restaurents.findOne({ place_id: value.place_id });
      if (doesExist) return;

      // Geting details of a place
      const placeInfo = await getPlaceInfo(value.place_id);

      // Raw photos Array
      // const placePhotos = getPlacePhotos(value.photos[0].photo_reference);

      // Additional processing before storing photos
      const photosArr = [];
      for (let i = 0; i < placeInfo.photos.length; i++) {
        photosArr.push(`${placeInfo.photos[i].photo_reference}`);
      }

      const dataObj = new restaurents({
        place_id: `${placeInfo.place_id}`,
        location: {
          type: "Point",
          coordinates: [
            placeInfo.geometry.location.lng,
            placeInfo.geometry.location.lat,
          ],
        },
        name: placeInfo.name,
        ratings: placeInfo.rating,
        address: placeInfo.formatted_address,
        phoneNo: placeInfo.formatted_phone_number,
        photos: photosArr,
      });

      await dataObj.save();
    });

    res.status(resCodes.SUCCESS).send({
      msg: resMsg.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { savePlaceApi };
