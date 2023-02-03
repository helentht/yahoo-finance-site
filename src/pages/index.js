import * as React from "react";
import api from "../api";

const IndexPage = () => {
  api();
  const fetchData = (e) => {
    e.preventDefault();

    api();
  };

  return (
    <main>
      <form onSubmit={fetchData}>
        <button type="Submit">Submit</button>
      </form>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Yahoo Finance Site</title>;
