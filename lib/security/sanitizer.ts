export function sanitizeInput(input: string): string {
  // Basic sanitization - remove potential script tags and dangerous content
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim()
}

export function sanitizeOutput(output: unknown): unknown {
  if (typeof output === "string") {
    return sanitizeInput(output)
  }

  if (typeof output === "object" && output !== null) {
    return JSON.parse(sanitizeInput(JSON.stringify(output)))
  }

  return output
}

export function validateFileUpload(file: File): { isValid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ["text/plain", "application/json", "text/csv"]

  if (file.size > maxSize) {
    return { isValid: false, error: "File size exceeds 10MB limit" }
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: "File type not allowed" }
  }

  return { isValid: true }
}
