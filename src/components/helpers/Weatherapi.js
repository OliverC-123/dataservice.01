import axios from "axios";

const api = {
  baseUrl: "https://api.openweathermap.org/data/2.5/weather?units=metric",
  key: "&appid=7c1e023709c110c30ad9b960076d599c",
};
export const getWeather = (zip) => {
  let response = axios
    .get(api.baseUrl + "&zip=" + zip + ",dk" + api.key)
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.log("Error", err);
      // return null;
      throw new Error("Apologies, no weather could be found");

    });
  return response;
};
export const getWeatherLatLon = (position) => {
  let response = axios
    .get(
      api.baseUrl +
        "&lat=" +
        position.latitude +
        "&lon=" +
        position.longitude +
        api.key
    )
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.log("Error", err);
      return null;
    });
  return response;
};
