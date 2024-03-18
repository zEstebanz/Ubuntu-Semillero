import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.scss";
import { ThemeProvider } from "@mui/material/styles";
import { store } from './store'
import { Provider as ReduxProvider } from 'react-redux'

import theme from "./theme/theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);
