import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import { SetupProfilePage } from "./SetupProfilePage";
import "./styles/platform-tokens.css";
import "./styles/globals.css";

/**
 * Platform app entry: selector + student/teacher apps.
 * /app/setup-profile?token=xxx = student profile setup (from email link).
 */
export function PlatformApp() {
  useEffect(() => {
    document.body.classList.add("platform");
    return () => document.body.classList.remove("platform");
  }, []);

  return (
    <Routes>
      <Route path="setup-profile" element={<SetupProfilePage />} />
      <Route path="*" element={<App />} />
    </Routes>
  );
}

export default PlatformApp;
