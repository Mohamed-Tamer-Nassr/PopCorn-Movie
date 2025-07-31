import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// import StarRating from "./StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <StarRating maxRating={5} />
    <StarRating maxRating={10} color="#ff0000" />
    <StarRating color="#00ff00" size={64} maxRating={7} className="test" /> */}
    <App />
  </React.StrictMode>
);
