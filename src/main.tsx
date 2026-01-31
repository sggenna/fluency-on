import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.tsx";
import { ErrorBoundary } from "./ErrorBoundary";
import { AuthProvider } from "./auth/AuthContext";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");
createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
  