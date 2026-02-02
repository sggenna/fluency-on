import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
            maxWidth: "480px",
            margin: "2rem auto",
          }}
        >
          <h1 style={{ color: "#253439", marginBottom: "1rem" }}>Algo deu errado</h1>
          <p style={{ color: "#7c898b", marginBottom: "1.5rem" }}>
            {this.state.error.message}
          </p>
          <button
            type="button"
            onClick={() => (this as React.Component<Props, State>).setState({ hasError: false, error: null })}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#fbb80f",
              color: "#253439",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Tentar novamente
          </button>
        </div>
      );
    }
    return (this as React.Component<Props, State>).props.children;
  }
}
