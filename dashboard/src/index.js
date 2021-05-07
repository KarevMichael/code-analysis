import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Loading from "./Loading";
import {App} from "./App";


ReactDOM.render(
  <React.Suspense fallback={<Loading />}>
    <App/>
  </React.Suspense>,
  document.getElementById("root")
);
