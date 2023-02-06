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

      transformResponse: [
        function (data) {
          // Do whatever you want to transform the data
          let json = JSON.parse(data);
          json = json["price"];
          const name = json["longName"];
          const symbol = json["symbol"];
          const price = json["regularMarketPrice"]["fmt"];
          const priceChange = json["regularMarketChange"]["fmt"];
          const percentChange = json["regularMarketChangePercent"]["fmt"];
          data = { name, symbol, price, priceChange, percentChange };

          return data;
        },
      ],
    }),
};
