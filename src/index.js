import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/userSlice";
import adminSlice from './redux/adminSlice';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

export let store = configureStore({
  reducer: {
    userSlice: userSlice,
    adminSlice: adminSlice
  },
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
