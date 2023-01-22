import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { ProvideAuth } from "./hooks/useAuth";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProvideAuth>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProvideAuth>
);
