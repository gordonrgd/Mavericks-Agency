/**
 * Obtient le chemin d'une image avec fallback
 */
export function getImagePath(path: string, fallback?: string): string {
  // Vérifier si l'image existe (côté client uniquement)
  if (typeof window !== "undefined") {
    // Logique de vérification d'existence côté client si nécessaire
  }

  return path || fallback || "/placeholder.svg?height=400&width=600"
}

/**
 * Génère les props optimisées pour Next.js Image
 */
export function getImageProps(src: string, alt: string, width: number, height: number, priority = false) {
  return {
    src: getImagePath(src),
    alt,
    width,
    height,
    priority,
    className: "object-cover",
  }
}

/**
 * Génère un placeholder SVG avec dimensions personnalisées
 */
export function getPlaceholder(width: number, height: number, text?: string): string {
  return `/placeholder.svg?height=${height}&width=${width}${text ? `&text=${encodeURIComponent(text)}` : ""}`
}

// Types pour les tailles d'images courantes
export const imageSizes = {
  logo: { width: 200, height: 50 },
  hero: { width: 1920, height: 1080 },
  project: { width: 600, height: 400 },
  testimonial: { width: 60, height: 60 },
  team: { width: 600, height: 500 },
} as const
