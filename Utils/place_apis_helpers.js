const axios = require("axios");

module.exports = {
  getPlaceInfo: async (placeId) => {
    const google_api_key = process.env.GOOGLE_PLACES_API_KEY;

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${google_api_key}`
    );

    return data.result;
  },
  getPlacePhotos: async (photoReferenceId) => {
    const google_api_key = process.env.GOOGLE_PLACES_API_KEY;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReferenceId}&key=${google_api_key}`
    );
    const fetchedUrl = response.request.res.responseUrl;
    return fetchedUrl;
  },
};
