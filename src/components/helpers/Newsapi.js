import axios from "axios";

const api = {
  baseUrl: "https://newsapi.org/v2/",
  key: "&apiKey=cbeecd39b83540b298b77b1a96d7f849",
};
export const getNews = (search, lang, param) => {
  let response = axios
    .get(api.baseUrl + param + "?q=" + search + "&language=" + lang + api.key)
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.log("Error", err);
      return null;
    });
  return response;
};
