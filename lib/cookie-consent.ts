export const COOKIE_CONSENT_STORAGE_KEY = "mavericks_cookie_consent"

export type CookieConsentChoice = "accepted" | "rejected"

export function getStoredCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null
  const value = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
  if (value === "accepted" || value === "rejected") return value
  return null
}

export function hasMarketingConsent(): boolean {
  return getStoredCookieConsent() === "accepted"
}

export function persistCookieConsent(choice: CookieConsentChoice): void {
  if (typeof window === "undefined") return
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice)
}
