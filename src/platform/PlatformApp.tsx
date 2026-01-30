import { useEffect } from "react";
import App from "./App";
import "./styles/platform-tokens.css";
import "./styles/semantic.css";

/**
 * Root of the integrated Student Portal Platform (from Studentportalplatform repo).
 * Renders the platform selector (student/teacher) and the chosen portal.
 * Applies the original repo's design tokens when mounted so styling matches.
 */
export function PlatformApp() {
  useEffect(() => {
    document.body.classList.add("platform");
    return () => document.body.classList.remove("platform");
  }, []);

  return <App />;
}
