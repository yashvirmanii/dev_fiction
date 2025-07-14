import type { ToolSlug, ToolResult, ToolOptions } from "@/types/tools"
import { sanitizeInput, sanitizeOutput } from "@/lib/security/sanitizer"
import { validateToolInput } from "@/lib/validation/tool-validation"

export async function processToolRequest(
  toolSlug: ToolSlug,
  input: string,
  options?: ToolOptions,
): Promise<ToolResult> {
  const startTime = performance.now()

  try {
    // Sanitize input
    const sanitizedInput = sanitizeInput(input)

    // Validate input
    const validation = validateToolInput(toolSlug, sanitizedInput, options)
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
      }
    }

    // Dynamic import of tool processor
    const toolModule = await import(`@/lib/tools/processors/${toolSlug}`)
    const result = await toolModule.process(sanitizedInput, options)

    const endTime = performance.now()
    const processingTime = endTime - startTime

    return {
      success: true,
      data: sanitizeOutput(result),
      metadata: {
        processingTime,
        inputSize: sanitizedInput.length,
        outputSize: JSON.stringify(result).length,
      },
    }
  } catch (error) {
    const endTime = performance.now()
    const processingTime = endTime - startTime

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      metadata: {
        processingTime,
        inputSize: input.length,
        outputSize: 0,
      },
    }
  }
}
