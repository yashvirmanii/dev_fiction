interface LogContext {
  [key: string]: unknown
}

export function logInfo(message: string, context?: LogContext) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[INFO] ${message}`, context)
  }
  // In production, send to logging service (e.g., Vercel Analytics, Sentry)
}

export function logError(message: string, error: unknown, context?: LogContext) {
  const errorInfo = {
    message,
    error:
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error,
    context,
    timestamp: new Date().toISOString(),
  }

  if (process.env.NODE_ENV === "development") {
    console.error("[ERROR]", errorInfo)
  }

  // In production, send to error tracking service
  // Sentry.captureException(error, { contexts: { custom: context } });
}

export function logWarning(message: string, context?: LogContext) {
  if (process.env.NODE_ENV === "development") {
    console.warn(`[WARN] ${message}`, context)
  }
}
