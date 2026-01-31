import { useEffect } from "react";
import App from "./App";
import "./styles/platform-tokens.css";
import "./styles/semantic.css";

/**
 * Root of the platform. Applies platform styles. AuthProvider is at app root (main.tsx).
 */
export function PlatformApp() {
  useEffect(() => {
    document.body.classList.add("platform");
    return () => document.body.classList.remove("platform");
  }, []);

  return <App />;
}
