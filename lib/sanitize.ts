/**
 * Échappe les caractères HTML pour éviter l'injection dans les emails (XSS).
 */
export function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return ""
  const s = String(str)
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/**
 * Limite la longueur d'une chaîne (anti-abuse).
 */
export function truncate(str: unknown, maxLen: number): string {
  const s = String(str ?? "").trim()
  return s.length > maxLen ? s.slice(0, maxLen) + "…" : s
}
