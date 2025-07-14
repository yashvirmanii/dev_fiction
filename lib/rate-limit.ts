import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// In development, use a simple in-memory store
const redis =
  process.env.NODE_ENV === "production" && process.env.UPSTASH_REDIS_REST_URL
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      })
    : undefined

export const ratelimit = new Ratelimit({
  redis: redis ?? new Map(),
  limiter: Ratelimit.slidingWindow(100, "15 m"), // 100 requests per 15 minutes
  analytics: true,
})
