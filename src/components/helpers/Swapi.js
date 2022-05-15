import axios from "axios";
const api = {
    baseUrl: "http://swapi.dev/api/"
};

export const getSW = (Page) => {
    let responseSW = axios
      .get(api.baseUrl + "people?page=" + Page)
      .then((dataSW) => {
        return dataSW.data;
      })
      .catch((err) => {
        console.log("Error", err);
        return null;
      });
    return responseSW;
  };