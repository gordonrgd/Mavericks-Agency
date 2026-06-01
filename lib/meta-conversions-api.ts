import { createHash } from "crypto"
import { META_PIXEL_ID } from "@/lib/meta-pixel"

const GRAPH_API_VERSION = "v21.0"

function hashMetaValue(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

function hashPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (!digits) return ""
  return hashMetaValue(digits)
}

export function isMetaConversionsApiEnabled(): boolean {
  return Boolean(
    META_PIXEL_ID &&
      process.env.META_CONVERSIONS_API_TOKEN?.trim()
  )
}

export type MetaLeadPayload = {
  eventId: string
  eventSourceUrl: string
  contentName: "contact" | "apply"
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  clientUserAgent?: string
  clientIpAddress?: string
}

/** Envoie un Lead via l’API Conversions (serveur). Ne lève pas d’erreur vers l’appelant. */
export async function sendMetaLeadEvent(payload: MetaLeadPayload): Promise<void> {
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN?.trim()
  if (!accessToken || !META_PIXEL_ID) return

  const userData: Record<string, string | string[]> = {}
  if (payload.email) {
    const hashed = hashMetaValue(payload.email)
    if (hashed) userData.em = [hashed]
  }
  if (payload.phone) {
    const hashed = hashPhone(payload.phone)
    if (hashed) userData.ph = [hashed]
  }
  if (payload.firstName) {
    const hashed = hashMetaValue(payload.firstName)
    if (hashed) userData.fn = [hashed]
  }
  if (payload.lastName) {
    const hashed = hashMetaValue(payload.lastName)
    if (hashed) userData.ln = [hashed]
  }
  if (payload.clientIpAddress) {
    userData.client_ip_address = payload.clientIpAddress
  }
  if (payload.clientUserAgent) {
    userData.client_user_agent = payload.clientUserAgent
  }

  const event: Record<string, unknown> = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: payload.eventId,
    action_source: "website",
    event_source_url: payload.eventSourceUrl,
    custom_data: {
      content_name: payload.contentName,
    },
  }

  if (Object.keys(userData).length > 0) {
    event.user_data = userData
  }

  const testEventCode = process.env.META_TEST_EVENT_CODE?.trim()
  const body: Record<string, unknown> = {
    data: [event],
  }
  if (testEventCode) {
    body.test_event_code = testEventCode
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.error("Meta CAPI Lead error:", res.status, text)
    }
  } catch (err) {
    console.error("Meta CAPI Lead request failed:", err)
  }
}

export function getClientIpFromRequest(req: Request): string | undefined {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  return req.headers.get("x-real-ip")?.trim() || undefined
}
