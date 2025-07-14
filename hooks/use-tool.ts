"use client"

import { useState } from "react"
import type { ToolSlug, ToolResult, ToolOptions } from "@/types/tools"

export function useTool(toolSlug: ToolSlug) {
  const [isLoading, setIsLoading] = useState(false)

  const processData = async (input: string, options?: ToolOptions): Promise<ToolResult> => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/tools/${toolSlug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input, options }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Request failed")
      }

      return await response.json()
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { processData, isLoading }
}
