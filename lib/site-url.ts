/**
 * URL canonique du site (sans slash final). Pour les images OG, liens absolus, etc.
 * Définir NEXT_PUBLIC_SITE_URL sur Vercel (ex. https://www.mavericks-agency.com).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (raw) return raw.replace(/\/+$/, "")
  return "https://www.mavericks-agency.com"
}
