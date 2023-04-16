import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Context from "./Components/OAuthContext";

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el);

root.render(
  <Context>
    <App />
  </Context>
);
