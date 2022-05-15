import axios from "axios";

const api = {
  baseUrl: "https://facts-by-api-ninjas.p.rapidapi.com/v1/facts",
  baseUrl2: "https://genius.p.rapidapi.com/artists/16775/songs",
  baseUrl3: "https://quotes15.p.rapidapi.com/quotes/random/",
  baseUrl4: "https://love-calculator.p.rapidapi.com/getPercentage",
  apiKey: "6fe89b8047msh0b856764862799bp18dd0cjsn99b8ae40d0af",
};
// GET RANDOM FACT
export const getFact = () => {
  let responseFact = axios
    .get(api.baseUrl, {
      headers: {
        "X-RapidAPI-Host": "facts-by-api-ninjas.p.rapidapi.com",
        "X-RapidAPI-Key": api.apiKey,
      },
    })
    .then((dataFact) => {
      return dataFact.data;
    })
    .catch((err) => {
      console.log("error", err);
      return null;
    });
  return responseFact;
};
// GET LIST FROM GENIUS
export const getSong = () => {
  let responseSong = axios
    .get(api.baseUrl2, {
      headers: {
        "X-RapidAPI-Host": "genius.p.rapidapi.com",
        "X-RapidAPI-Key": api.apiKey,
      },
    })
    .then((dataSong) => {
      return dataSong.data;
    })
    .catch((err) => {
      console.log("error", err);
      return null;
    });
  return responseSong;
};
// GET RANDOM QUOTE
export const getQuote = (lang) => {
  let responseQuote = axios
    .get(api.baseUrl3 + "?language_code=" + lang, {
      headers: {
        "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
        "X-RapidAPI-Key": api.apiKey,
      },
    })
    .then((dataQuote) => {
      return dataQuote.data;
    })
    .catch((err) => {
      console.log("Error", err);
      return null;
    });
  return responseQuote;
};
export const getCalc = (name1, name2) => {
  let responseCalc = axios
    .get(api.baseUrl4 + "?fname=" + name1 + "&sname=" + name2, {
      headers: {
        "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
        "X-RapidAPI-Key": api.apiKey,
      },
    })
    .then((dataCalc) => {
      return dataCalc.data;
    })
    .catch((err) => {
      console.log("Error", err);
      return null;
    });
  return responseCalc;
};

