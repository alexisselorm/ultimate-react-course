import React from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./starRating";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={24} color="red" className="test" defaultRating={2} />

    <Test /> */}
    {/* <StarRating maxRating={5} defaultRating={3} size={48} messages={["Alexis"]}/> */}
  </React.StrictMode>
);
