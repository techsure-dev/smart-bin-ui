import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";
import { TankProvider } from "./context/TankContext";
import { PointsProvider } from "./context/PointsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TankProvider>
      <PointsProvider>
        <App />
      </PointsProvider>
    </TankProvider>
  </React.StrictMode>
);
