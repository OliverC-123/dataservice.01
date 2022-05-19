var myHeaders = new Headers();
myHeaders.append("apikey", "h17CH2GC8pVUX0kLG1kUe5EMAPsO11Yb");
const api = {
  basedUrl:
    "https://api.apilayer.com/exchangerates_data/convert?to={to}&from={from}&amount={amount}",
  key: "h17CH2GC8pVUX0kLG1kUe5EMAPsO11Yb",
};
var requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

export const getCurrency = () => {
  let response = axios
    .get(api.basedUrl, {
      headers: myHeaders.append("apikey", "h17CH2GC8pVUX0kLG1kUe5EMAPsO11Yb"),
    })
    .catch((err) => {
      console.log("Error", err);
      // return null;
      throw new Error("Apologies, no weather could be found");
    });
  return response;
};
