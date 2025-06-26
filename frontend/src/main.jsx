import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import ThemeProvider from "./utils/ThemeContext";

import ErrorBoundary from "./errorBoundary";
import LoginPage from "./pages/loginpage/Login";

import "./utils/globalfunctions/GlobalFunctionDeclaration";
import "./assets/base.scss";

// NOTE: disable all console log
// console.log = console.warn = console.error = () => { };

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
      <ThemeProvider>
          <ErrorBoundary>
            <LoginPage />
          </ErrorBoundary>
      </ThemeProvider>
    </Router>
);
