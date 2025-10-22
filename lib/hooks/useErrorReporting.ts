import { useCallback } from "react";

interface ErrorReportingOptions {
  context?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export function useErrorReporting() {
  const reportError = useCallback(
    (error: Error, options?: ErrorReportingOptions) => {
      if (process.env.NODE_ENV === "development") {
        console.error("Error reported:", {
          message: error.message,
          stack: error.stack,
          context: options?.context,
          userId: options?.userId,
          metadata: options?.metadata,
        });
      }
    },
    []
  );

  const reportWarning = useCallback(
    (message: string, options?: ErrorReportingOptions) => {
      if (process.env.NODE_ENV === "development") {
        console.warn("Warning reported:", {
          message,
          context: options?.context,
          userId: options?.userId,
          metadata: options?.metadata,
        });
      }

      console.warn("Warning:", message, options);
    },
    []
  );

  return {
    reportError,
    reportWarning,
  };
}
