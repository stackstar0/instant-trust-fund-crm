export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    console.error("Captured Server Error:", error, context);
    return;
  }
  console.error("Captured Client Error:", error, {
    route: window.location.pathname,
    ...context,
  });
}
