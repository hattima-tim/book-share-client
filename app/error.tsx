"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const handleReset = () => {
    window.location.reload()
  }

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
              We encountered an unexpected error. Please try refreshing the page
              or go back to the home page.
            </AlertDescription>
          </Alert>
          <div className="flex gap-2 justify-center">
            <Button onClick={handleReset} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button onClick={() => (window.location.href = "/")} size="sm">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </div>
          {process.env.NEXT_PUBLIC_ENVIRONMENT === "development" && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-muted-foreground">
                Error Details (Development)
              </summary>
              <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
                {"\n"}
                {error.stack}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
