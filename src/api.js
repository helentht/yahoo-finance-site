import axios from "axios";

const options = {
  method: "GET",
  url: "https://yh-finance.p.rapidapi.com/stock/v2/get-summary",
  params: { symbol: "AMRN", region: "US" },
  headers: {
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
  },
};

const api = () => {
  console.log(process.env.RAPIDAPI_KEY);
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default api;
