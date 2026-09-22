import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import { applyTheme, getStoredTheme } from "./theme/theme.js";
import "./styles/globals.css";

applyTheme(getStoredTheme());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
