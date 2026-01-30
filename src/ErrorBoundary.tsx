import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  declare readonly props: ErrorBoundaryProps;
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render(): React.ReactNode {
    const { children } = this.props;
    if (this.state.hasError && this.state.error) {
      return (
        <div
          style={{
            padding: 24,
            fontFamily: "system-ui, sans-serif",
            maxWidth: 600,
            margin: "40px auto",
          }}
        >
          <h1 style={{ color: "#d4183d", marginBottom: 16 }}>
            Something went wrong
          </h1>
          <pre
            style={{
              background: "#f6f4f1",
              padding: 16,
              borderRadius: 8,
              overflow: "auto",
              fontSize: 14,
            }}
          >
            {this.state.error.message}
          </pre>
          <p style={{ marginTop: 16, color: "#7c898b" }}>
            Check the browser console for the full stack trace.
          </p>
        </div>
      );
    }
    return children;
  }
}
