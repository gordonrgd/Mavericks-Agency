export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? ""

export function isMetaPixelEnabled(): boolean {
  return META_PIXEL_ID.length > 0
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/** Envoie un événement Meta (ex. Lead après envoi de formulaire). */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined" || !isMetaPixelEnabled()) return
  if (typeof window.fbq !== "function") return
  if (params) {
    window.fbq("track", eventName, params)
  } else {
    window.fbq("track", eventName)
  }
}
