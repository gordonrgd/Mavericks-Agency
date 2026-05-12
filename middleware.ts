import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rate limit simple en mémoire (pour VPS sans Redis)
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 10 // 10 requêtes POST /api par IP par minute

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown"
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }
  if (now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }
  entry.count++
  return entry.count <= RATE_LIMIT_MAX
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Headers de sécurité
  res.headers.set("X-Frame-Options", "DENY")
  res.headers.set("X-Content-Type-Options", "nosniff")
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  res.headers.set("X-XSS-Protection", "1; mode=block")
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Rate limit sur les API POST
  if (req.method === "POST" && req.nextUrl.pathname.startsWith("/api/")) {
    const ip = getClientIp(req)
    if (!checkRateLimit(ip)) {
      return new NextResponse(JSON.stringify({ ok: false, error: "Trop de requêtes. Réessayez dans 1 minute." }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      })
    }
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2)$).*)"],
}
