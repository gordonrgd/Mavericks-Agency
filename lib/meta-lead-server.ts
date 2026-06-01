import {
  getClientIpFromRequest,
  isMetaConversionsApiEnabled,
  sendMetaLeadEvent,
} from "@/lib/meta-conversions-api"

type LeadServerInput = {
  req: Request
  eventId: string
  contentName: "contact" | "apply"
  marketingCookiesAccepted: boolean
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
}

export async function trackMetaLeadServer(input: LeadServerInput): Promise<void> {
  if (!input.marketingCookiesAccepted || !isMetaConversionsApiEnabled()) return

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.mavericks-agency.com"
  const path = input.contentName === "contact" ? "/contact" : "/apply"

  await sendMetaLeadEvent({
    eventId: input.eventId,
    eventSourceUrl: `${siteUrl}${path}`,
    contentName: input.contentName,
    email: input.email,
    phone: input.phone,
    firstName: input.firstName,
    lastName: input.lastName,
    clientUserAgent: input.req.headers.get("user-agent") ?? undefined,
    clientIpAddress: getClientIpFromRequest(input.req),
  })
}

export function parseMetaEventId(body: unknown): string | undefined {
  if (!body || typeof body !== "object") return undefined
  const id = (body as Record<string, unknown>).metaEventId
  return typeof id === "string" && id.length > 0 && id.length <= 64 ? id : undefined
}

export function parseMarketingCookiesAccepted(body: unknown): boolean {
  if (!body || typeof body !== "object") return false
  return (body as Record<string, unknown>).marketingCookiesAccepted === true
}

export function splitFullName(name: string): {
  firstName?: string
  lastName?: string
} {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return {}
  if (parts.length === 1) return { firstName: parts[0] }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") }
}
