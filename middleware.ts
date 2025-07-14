import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function rateLimit(request: NextRequest): boolean {
  const ip = request.ip ?? "anonymous"
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 100

  const current = rateLimitStore.get(ip)

  if (!current || now > current.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (current.count >= maxRequests) {
    return false
  }

  current.count++
  return true
}

export function middleware(request: NextRequest) {
  // Apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    if (!rateLimit(request)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/(api)(.*)"],
}
