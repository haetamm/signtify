"use client";

import ErrorView from "@/components/organisms/ErrorView";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  let code: number | undefined;
  let message: string | undefined;

  try {
    const parsed = JSON.parse(error.message);
    code = parsed?.code;
    message = parsed?.general;
  } catch {
    code = 500;
    message = error.message;
  }

  return <ErrorView code={code} message={message} onRetry={reset} />;
}
