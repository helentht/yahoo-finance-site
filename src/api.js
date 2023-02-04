import axios from "axios";

const instance = axios.create({
  baseURL: "https://yh-finance.p.rapidapi.com/",
  headers: {
    "content-type": "application/octet-stream",
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
  },
});

export default {
  getStockSummary: () =>
    instance({
      method: "GET",
      url: "/stock/v2/get-summary",
      params: {
        symbol: "AMRN",
        region: "US",
      },
    }),
};
