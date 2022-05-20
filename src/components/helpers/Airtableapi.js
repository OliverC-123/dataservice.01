import axios from "axios";

const api = {
  baseUrl: "https://api.airtable.com/v0/appdLBw1x1T304oPv/",
  key: "keylETDt0sga6ySt6",
};
// get
export const getGrocery = () => {
  let endpoint = "Shopping/";

  let response = axios
    .get(api.baseUrl + endpoint, {
      headers: {
        Authorization: "Bearer " + api.key,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error", error);
      throw new Error("Sorry, an error has occourred");
    });
  return response;
};
// post
export const postGrocery = (myItems) => {
  let endpoint = "Shopping/";

  let response = axios
    .post(api.baseUrl + endpoint, myItems, {
      headers: {
        Authorization: "Bearer " + api.key,
        "Content-type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error", error);
      throw new Error("Sorry, an error has occourred");
    });
  return response;
};
// delete
export const delGrocery = (itemID) => {
  let endpoint = "Shopping/";

  let response = axios
    .delete(api.baseUrl + endpoint + itemID, {
      headers: {
        Authorization: "Bearer " + api.key,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error", error);
      throw new Error("Sorry, an error has occourred");
    });
  return response;
};
export const patchGrocery = (editItems, itemID) => {
  let endpoint = "Shopping/";

  let response = axios
    .patch(api.baseUrl + endpoint + itemID, editItems, {
      headers: {
        Authorization: "Bearer " + api.key,
        "Content-type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error", error);
      throw new Error("Sorry, an error has occourred");
    });
  return response;
};
