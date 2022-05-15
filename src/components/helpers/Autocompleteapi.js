import axios from "axios";

const api = {
  baseUrl: "https://api.dataforsyningen.dk/",
};
export const getPostal = (dawapostnr) => {
  let response = axios
    .get(api.baseUrl + "postnumre/autocomplete?q=" + dawapostnr)
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.log("Error", err);
      // return null;
      throw new Error("Apologies, no weather could be found")
    });
  return response;
};
