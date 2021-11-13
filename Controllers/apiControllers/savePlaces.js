const axios = require("axios");
const {
  getPlaceInfo,
  getPlacePhotos,
} = require("../../Utils/place_apis_helpers");
const resCodes = require("../../Constants/response.constants");
const resMsg = require("../../Constants/response.messages");
const restaurents = require("../../Models/restaurent.model");
const searched = require("../../Models/searched.model");

const helper = (place_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check for same object
      let doesExist = await restaurents.findOne({
        place_id: `${place_id}`,
      });
      if (doesExist) {
        resolve(null);
      }

      // Geting details of a place
      const placeInfo = await getPlaceInfo(place_id);

      // Additional processing before storing photos
      const photosArr = [];

      if (placeInfo.photos) {
        for (let i = 0; i < placeInfo.photos.length; i++) {
          let url = await getPlacePhotos(placeInfo.photos[i].photo_reference);
          photosArr.push(`${url}`);
        }
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

      resolve(dataObj);
    } catch (err) {
      reject(err);
    }
  });
};

const savePlaceApi = async (req, res, next) => {
  try {
    const { location, keyword, overridecheck } = req.query;
    // Get nearby place
    const google_api_key = process.env.GOOGLE_PLACES_API_KEY;
    const lat_lng = `${location}`.split(",");
    let type = keyword;
    let KEYWORD = `${keyword}`.toUpperCase();
    let flag = false;
    overridecheck ? (flag = true) : (flag = false);

    // Do the check for this query
    if (!flag) {
      const Ereq = await searched.findOne({
        lat_lng: lat_lng,
        keyword: `${keyword}`.toUpperCase(),
      });
      if (Ereq) {
        return res
          .status(200)
          .send({ msg: `data already present for this request` });
      }
    }

    const obj = new searched({
      lat_lng: lat_lng,
      keyword: `${keyword}`.toUpperCase(),
    });

    await obj.save();

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat_lng[0]}%2C${lat_lng[1]}&radius=500&keyword=${type}&key=${google_api_key}`
    );

    const resultArr = data.results;
    let duplicate = 0;

    const pArr = [];

    resultArr.map((value) => {
      pArr.push(helper(value.place_id));
    });

    await Promise.all(pArr)
      .then((objArr) => {
        objArr.map(async (value) => {
          if (value === null) {
            duplicate++;
          } else {
            await value.save();
          }
        });
      })
      .catch(async (err) => {
        if (!flag) {
          await searched.deleteOne({
            lat_lng: lat_lng,
            keyword: `${keyword}`.toUpperCase(),
          });
        }
        next(err);
      });

    if (flag) {
      await searched.updateOne(
        {
          lat_lng: lat_lng,
          keyword: `${keyword}`.toUpperCase(),
        },
        {
          lastUpdated: new Date(),
        }
      );
    }

    res.status(resCodes.SUCCESS).send({
      msg: resMsg.SUCCESS,
      stat: `${resultArr.length} object fetched ${duplicate} found`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { savePlaceApi };
