import React, { useState } from "react";
import api from "../api";
import "../styles/index.css";
import { Breadcrumb, Layout, theme } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const IndexPage: React.FC = () => {
  const { Header, Content, Footer } = Layout;

  interface Stock {
    fullName: string;
    symbol: string;
    description: string;
    latestPrice: number;
    previousPrice: number;
    priceChange: number;
    percentChange: number;
    priceChangeDirection: string;
    dates: string[];
    closePrices: number[];
  }

  const [responseData, setResponseData] = useState<Stock | "">("");
  const [symbol, setSymbol] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const fetchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timeSeriesResponse = await api.getTimeSeries(symbol);
    const overviewResponse = await api.getStockOverview(symbol);
    const response = {
      data: {
        ...timeSeriesResponse.data,
        ...overviewResponse.data,
      },
    };

    console.log(response);
    setResponseData(response.data);
    console.log(response.data);
    console.log(process.env.ALPHA_VANTAGE_KEYS);
    console.log(process.env.ALPHA_VANTAGE_API_KEY);
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Stock price",
      },
    },
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const labels = responseData ? responseData.dates : [];

  const data = {
    labels,
    datasets: [
      {
        label: "Time series",
        data: responseData
          ? responseData.closePrices.map((date) => date.close)
          : [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <main>
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-content"
            style={{
              background: colorBgContainer,
            }}
          >
            <form onSubmit={(e) => fetchData(e)}>
              <label htmlFor="symbol">Enter a stock symbol</label>
              <input
                type="text"
                name="symbol"
                id="symbol"
                value={symbol}
                placeholder="AMRN"
                onChange={(e) => setSymbol(e.target.value)}
              />

              <button type="submit">Submit</button>
            </form>
            {responseData && (
              <div>
                <div>
                  <h1 className="companyName">
                    {`${responseData.fullName ? responseData.fullName : ""} (${
                      responseData.symbol
                    }) `}
                  </h1>
                  <span
                    className="description"
                    onClick={() =>
                      setShowFullDescription((prevState) => !prevState)
                    }
                  >
                    {responseData.description
                      ? showFullDescription
                        ? responseData.description
                        : `${responseData.description.slice(0, 100)}...`
                      : ""}
                  </span>
                  <button
                    onClick={() =>
                      setShowFullDescription((prevState) => !prevState)
                    }
                  >
                    {showFullDescription ? `Read less` : `Read more`}
                  </button>
                </div>
                <div>
                  <span className="price">{responseData.latestPrice}</span>
                  <span
                    className={`priceChange ${
                      responseData.priceChangeDirection !== "0" &&
                      responseData.priceChangeDirection === "1"
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {responseData.priceChange}
                  </span>
                  <span
                    className={`priceChange ${
                      responseData.priceChangeDirection !== "0" &&
                      responseData.priceChangeDirection === "1"
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {`(${responseData.percentChange})`}
                  </span>
                </div>
                <div>
                  <Line data={data} options={options} />
                </div>
              </div>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Helen Tsui ©2023</Footer>
      </Layout>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Yahoo Finance Site</title>;
