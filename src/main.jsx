import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { userApi } from "./RTK/userApi";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiProvider api={userApi}>
    <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ApiProvider>
  </StrictMode>
);
