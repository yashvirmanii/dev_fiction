import { z } from "zod"

export const metadata = {
  name: "JSON Formatter",
  description: "Format and validate JSON data",
  features: ["Format JSON", "Validate syntax", "Minify JSON"],
}

const optionsSchema = z
  .object({
    indent: z.number().min(0).max(8).default(2),
    minify: z.boolean().default(false),
  })
  .optional()

export async function process(input: string, options?: unknown) {
  const validatedOptions = optionsSchema.parse(options)

  try {
    const parsed = JSON.parse(input)

    if (validatedOptions?.minify) {
      return {
        formatted: JSON.stringify(parsed),
        isValid: true,
        size: JSON.stringify(parsed).length,
      }
    }

    const formatted = JSON.stringify(parsed, null, validatedOptions?.indent ?? 2)

    return {
      formatted,
      isValid: true,
      size: formatted.length,
      lineCount: formatted.split("\n").length,
    }
  } catch (error) {
    return {
      formatted: "",
      isValid: false,
      error: error instanceof Error ? error.message : "Invalid JSON",
    }
  }
}
