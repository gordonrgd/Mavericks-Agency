export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? ""

export function isMetaPixelEnabled(): boolean {
  return META_PIXEL_ID.length > 0
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export type MetaTrackOptions = {
  eventID?: string
}

/** Envoie un événement Meta (ex. PageView, Lead). */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>,
  options?: MetaTrackOptions
): void {
  if (typeof window === "undefined" || !isMetaPixelEnabled()) return
  if (typeof window.fbq !== "function") return

  if (options?.eventID) {
    window.fbq("track", eventName, params ?? {}, { eventID: options.eventID })
  } else if (params) {
    window.fbq("track", eventName, params)
  } else {
    window.fbq("track", eventName)
  }
}
