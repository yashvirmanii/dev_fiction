import { z } from "zod"
import type { ToolSlug, ToolOptions } from "@/types/tools"

const baseInputSchema = z.string().max(1000000) // 1MB limit

const toolSchemas: Record<ToolSlug, z.ZodSchema> = {
  "json-formatter": baseInputSchema,
  "base64-encoder": baseInputSchema,
  "url-encoder": baseInputSchema,
  "jwt-decoder": z.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/),
  "html-entities": baseInputSchema,
  "regex-tester": baseInputSchema,
  "uuid-generator": z.string().optional(),
  "password-generator": z.string().optional(),
  "lorem-generator": z.string().optional(),
}

export function validateToolInput(
  toolSlug: ToolSlug,
  input: string,
  options?: ToolOptions,
): { isValid: boolean; error?: string } {
  try {
    const schema = toolSchemas[toolSlug]
    schema.parse(input)
    return { isValid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.errors.map((e) => e.message).join(", "),
      }
    }
    return { isValid: false, error: "Validation failed" }
  }
}
