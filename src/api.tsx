import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.alphavantage.co/",
  headers: {
    "content-type": "application/json",
  },
});

const apiKeys = process.env.ALPHA_VANTAGE_KEYS!.split(",");

const generateKey = () => {
  const random = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[random];
};

export default {
  getTimeSeries: (symbol: string) =>
    instance({
      method: "GET",
      url: `query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol.toUpperCase()}&apikey=${generateKey()}`,

      transformResponse: [
        function (data) {
          console.log(typeof data);
          console.log("key", generateKey());

          let timeSeriesJson = JSON.parse(data);

          const latestDate: string = Object.keys(
            timeSeriesJson["Time Series (Daily)"]
          )[0];

          const previousDate: string = Object.keys(
            timeSeriesJson["Time Series (Daily)"]
          )[1];

          const latestPrice: number = Number(
            timeSeriesJson["Time Series (Daily)"][latestDate]["4. close"]
          );

          const previousPrice: number = Number(
            timeSeriesJson["Time Series (Daily)"][previousDate]["4. close"]
          );

          let priceChange: string = (latestPrice - previousPrice).toFixed(2);
          let percentChange: string =
            (((latestPrice - previousPrice) / previousPrice) * 100).toFixed(2) +
            "%";

          let priceChangeDirection: string;
          if (latestPrice === previousPrice) {
            priceChangeDirection = "0";
          } else if (latestPrice > previousPrice) {
            priceChangeDirection = "1";
            priceChange = "+" + priceChange;
            percentChange = "+" + percentChange;
          } else {
            priceChangeDirection = "-1";
          }

          const dates = Object.keys(
            timeSeriesJson["Time Series (Daily)"]
          ).reverse();

          const closePrices = dates.map((date) => {
            return {
              date,
              close: Number(
                timeSeriesJson["Time Series (Daily)"][date]["4. close"]
              ),
            };
          });

          const symbol = timeSeriesJson["Meta Data"]["2. Symbol"];
          const refreshed = timeSeriesJson["Meta Data"]["3. Last Refreshed"];
          data = {
            symbol,
            latestPrice,
            previousPrice,
            priceChange,
            percentChange,
            priceChangeDirection,
            refreshed,
            dates,
            closePrices,
          };

          return data;
        },
      ],
    }),
  getStockOverview: (symbol: string) =>
    instance({
      method: "GET",
      url: `query?function=OVERVIEW&symbol=${symbol}&apikey=${generateKey()}`,

      transformResponse: [
        function (data) {
          let overviewJson = JSON.parse(data);

          const fullName: string = overviewJson["Name"];
          const description: string = overviewJson["Description"];
          data = {
            fullName,
            description,
          };

          return data;
        },
      ],
    }),
};
