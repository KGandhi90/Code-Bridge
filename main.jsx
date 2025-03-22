import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./tailwind.css"; // Ensure Tailwind is correctly imported

// Create the root and render App
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
