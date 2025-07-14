import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { ratelimit } from "@/lib/rate-limit"
import { processToolRequest } from "@/lib/tools/tool-processor"
import { logError, logInfo } from "@/lib/logger"
import type { ToolSlug } from "@/types/tools"

const toolRequestSchema = z.object({
  input: z.string().max(1000000), // 1MB limit
  options: z.record(z.unknown()).optional(),
})

interface RouteParams {
  params: {
    slug: string
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const clientIP = request.ip ?? "anonymous"

    // Rate limiting
    const { success, limit, reset, remaining } = await ratelimit.limit(`ip:${clientIP}`)

    if (!success) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        },
      )
    }

    // Validate request body
    const body = await request.json()
    const validatedData = toolRequestSchema.parse(body)

    // Process tool request
    const result = await processToolRequest(params.slug as ToolSlug, validatedData.input, validatedData.options)

    logInfo("Tool request processed", {
      tool: params.slug,
      inputLength: validatedData.input.length,
    })

    return NextResponse.json(result, {
      headers: {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString(),
      },
    })
  } catch (error) {
    logError("Tool API error", error, {
      tool: params.slug,
    })

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const tool = await import(`@/lib/tools/${params.slug}`)

    return NextResponse.json({
      name: tool.metadata.name,
      description: tool.metadata.description,
      features: tool.metadata.features,
    })
  } catch (error) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 })
  }
}
