import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./hooks/useAuthProvider.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </BrowserRouter>
);
