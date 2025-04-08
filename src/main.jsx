import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MyDeckContext, MyDeckProvider } from "./context/MyDeckContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MyDeckProvider>
      <App />
    </MyDeckProvider>
  </StrictMode>
);
