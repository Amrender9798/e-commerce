import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Provider } from "react-redux";
import store from "./Redux/store";

const stripePromise = loadStripe(
  "pk_test_51NyFnbSItGzs2jnUWE0Y1DVQPmHz6XPZb3EZBniopx9k05g8tiecxNZS3YsWmjRWnDARp21VeKrC31ptFTjU6ES100pFr94uzk"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
