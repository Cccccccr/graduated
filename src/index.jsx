import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import { message } from 'antd';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LazyRouter from "./router/lazy";

import store from "./redux/store";

// axios设置baseUrl
axios.defaults.baseURL = "/api";

// 引入全局的axios
React.Component.prototype.axios = axios;
// 引入全局的message为$message
React.Component.prototype.$message = message;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <Router /> */}
      <LazyRouter />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
