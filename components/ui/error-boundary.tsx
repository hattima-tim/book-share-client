"use client";

import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./cards";
import { Alert, AlertDescription } from "./alert";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  level?: "page" | "section" | "component";
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
  level: "page" | "section" | "component";
}

class ErrorBoundaryClass extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    if (process.env.NODE_ENV === "development") {
      console.error("Error Boundary caught an error:", error, errorInfo);
    }

    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
          level={this.props.level || "component"}
        />
      );
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  level,
}) => {
  const getErrorContent = () => {
    switch (level) {
      case "page":
        return (
          <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <CardTitle className="text-xl">Something went wrong</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="destructive">
                  <AlertDescription>
                    We encountered an unexpected error. Please try refreshing
                    the page.
                  </AlertDescription>
                </Alert>
                <div className="flex gap-2 justify-center">
                  <Button onClick={resetError} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/")}
                    size="sm"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Button>
                </div>
                {process.env.NODE_ENV === "development" && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-muted-foreground">
                      Error Details (Development)
                    </summary>
                    <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                      {error.message}
                      {"\n"}
                      {error.stack}
                    </pre>
                  </details>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case "section":
        return (
          <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h3 className="font-medium text-destructive">Section Error</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              This section encountered an error and couldn&apos;t load properly.
            </p>
            <Button onClick={resetError} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
            {process.env.NODE_ENV === "development" && (
              <details className="mt-3">
                <summary className="cursor-pointer text-xs text-muted-foreground">
                  Error Details
                </summary>
                <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-auto">
                  {error.message}
                </pre>
              </details>
            )}
          </div>
        );

      default: // component level
        return (
          <div className="p-3 border border-destructive/20 rounded bg-destructive/5">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
              <span className="text-destructive font-medium">
                Component Error
              </span>
              <Button
                onClick={resetError}
                variant="ghost"
                size="sm"
                className="ml-auto"
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
            {process.env.NODE_ENV === "development" && (
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {error.message}
              </p>
            )}
          </div>
        );
    }
  };

  return getErrorContent();
};

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = (props) => {
  return <ErrorBoundaryClass {...props} />;
};

export const PageErrorBoundary: React.FC<Omit<ErrorBoundaryProps, "level">> = (
  props
) => {
  return <ErrorBoundary {...props} level="page" />;
};

export const SectionErrorBoundary: React.FC<
  Omit<ErrorBoundaryProps, "level">
> = (props) => {
  return <ErrorBoundary {...props} level="section" />;
};

export const ComponentErrorBoundary: React.FC<
  Omit<ErrorBoundaryProps, "level">
> = (props) => {
  return <ErrorBoundary {...props} level="component" />;
};
