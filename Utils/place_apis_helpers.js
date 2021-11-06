const axios = require("axios");
module.exports = {
  getPlaceInfo: async (placeId) => {
    // https://maps.googleapis.com/maps/api/place/details/json
    // ?fields=name%2Crating%2Cformatted_phone_number
    // &place_id=ChIJN1t_tDeuEmsRUsoyG83frY4
    // &key=YOUR_API_KEY

    const google_api_key = process.env.GOOGLE_PLACES_API_KEY;

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${google_api_key}`
    );

    return data.result;
  },
  getPlacePhotos: async (photoReferenceId) => {
    const google_api_key = process.env.GOOGLE_PLACES_API_KEY;

    const { data } =
      await axios.get(`https://maps.googleapis.com/maps/api/place/photo
      ?maxwidth=400
      &photo_reference=${photoReferenceId}
      &key=${google_api_key}`);

    return data.result;
  },
};
