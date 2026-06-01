import { hasMarketingConsent } from "@/lib/cookie-consent"
import { isMetaPixelEnabled, trackMetaEvent } from "@/lib/meta-pixel"

const PENDING_LEAD_KEY = "mavericks_meta_pending_lead"

type PendingLead = {
  contentName: "contact" | "apply"
  eventId: string
}

export function createMetaEventId(): string {
  return crypto.randomUUID()
}

export function trackMetaLead(payload: PendingLead): void {
  if (!isMetaPixelEnabled() || !hasMarketingConsent()) return

  if (typeof window.fbq === "function") {
    trackMetaEvent(
      "Lead",
      { content_name: payload.contentName },
      { eventID: payload.eventId }
    )
    sessionStorage.removeItem(PENDING_LEAD_KEY)
    return
  }

  sessionStorage.setItem(PENDING_LEAD_KEY, JSON.stringify(payload))
}

/** À appeler après chargement du pixel (ex. page de confirmation). */
export function flushPendingMetaLead(): void {
  if (!isMetaPixelEnabled() || !hasMarketingConsent()) return
  const raw = sessionStorage.getItem(PENDING_LEAD_KEY)
  if (!raw) return

  try {
    const pending = JSON.parse(raw) as PendingLead
    if (
      pending?.eventId &&
      (pending.contentName === "contact" || pending.contentName === "apply")
    ) {
      trackMetaLead(pending)
    } else {
      sessionStorage.removeItem(PENDING_LEAD_KEY)
    }
  } catch {
    sessionStorage.removeItem(PENDING_LEAD_KEY)
  }
}
