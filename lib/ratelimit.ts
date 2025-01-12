import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import config from "@/lib/config";

// Create a new Redis instance
const redis = new Redis({
  url: config.env.upstash.redisUrl,
  token: config.env.upstash.redisToken,
});

// Create a new ratelimiter that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  prefix: "ratelimit",
});

// Create a wrapper function to handle the response
export async function checkRateLimit(identifier: string) {
  try {
    const result = await ratelimit.limit(identifier);
    return { success: result.success, remaining: result.remaining };
  } catch (error) {
    console.error('Rate limit error:', error);
    // Default to allowing the request if there's an error
    return { success: true, remaining: 1 };
  }
}

export { ratelimit };
export default checkRateLimit;
