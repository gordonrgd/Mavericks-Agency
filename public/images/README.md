# Structure des Images - Mavericks Agency

## Organisation des dossiers

### `/public/images/`
\`\`\`
public/
└── images/
    ├── logo/                    # Logos et branding
    │   ├── mavericks-logo.png   # Logo principal
    │   ├── mavericks-logo-white.png
    │   ├── mavericks-logo-dark.png
    │   └── favicon.ico
    │
    ├── home/                    # Images page d'accueil
    │   ├── hero-background.jpg
    │   ├── testimonial-sarah.jpg
    │   └── approach/
    │       ├── strategy-icon.svg
    │       ├── content-icon.svg
    │       └── growth-icon.svg
    │
    ├── work/                    # Portfolio et projets
    │   ├── project-1-main.jpg
    │   ├── project-1-gallery-1.jpg
    │   ├── project-1-gallery-2.jpg
    │   ├── project-1-gallery-3.jpg
    │   ├── project-2-main.jpg
    │   ├── project-2-gallery-1.jpg
    │   ├── project-2-gallery-2.jpg
    │   ├── project-3-main.jpg
    │   ├── project-3-gallery-1.jpg
    │   └── project-3-gallery-2.jpg
    │
    ├── about/                   # Images page à propos
    │   ├── team-photo.jpg
    │   ├── office-space.jpg
    │   └── values/
    │       ├── discretion-icon.svg
    │       ├── results-icon.svg
    │       └── support-icon.svg
    │
    ├── testimonials/            # Photos de témoignages
    │   ├── sarah-profile.jpg
    │   ├── client-2-profile.jpg
    │   └── client-3-profile.jpg
    │
    ├── clients/                 # Logos clients (anonymisés)
    │   ├── creator-1-logo.png
    │   ├── creator-2-logo.png
    │   ├── creator-3-logo.png
    │   ├── creator-4-logo.png
    │   └── creator-5-logo.png
    │
    ├── social/                  # Images réseaux sociaux
    │   ├── og-image.jpg         # Open Graph
    │   └── twitter-card.jpg     # Twitter Card
    │
    ├── icons/                   # Icônes SVG
    │   ├── target.svg
    │   ├── lightbulb.svg
    │   ├── trending-up.svg
    │   ├── heart.svg
    │   └── eye.svg
    │
    └── backgrounds/             # Images de fond
        ├── hero-gradient.jpg
        ├── section-pattern.svg
        └── testimonial-bg.jpg
\`\`\`

## Recommandations

### Formats et tailles
- **Logo principal** : PNG avec fond transparent, 400x100px minimum
- **Photos de projets** : JPG, 1200x800px minimum
- **Photos de profil** : JPG, 300x300px (carré)
- **Images de fond** : JPG, 1920x1080px minimum
- **Icônes** : SVG de préférence pour la scalabilité

### Optimisation
- Compressez les images avant de les ajouter
- Utilisez WebP quand possible pour de meilleures performances
- Gardez les fichiers sous 500KB quand possible

### Nommage
- Utilisez des noms descriptifs en kebab-case
- Évitez les espaces et caractères spéciaux
- Incluez la taille si nécessaire (ex: logo-400x100.png)
\`\`\`

```typescriptreact file="components/header.tsx"
[v0-no-op-code-block-prefix]"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "./language-switcher"
import AnimatedButton from "./animated-button"
import Image from "next/image"
import { imagePaths } from "@/lib/image-paths"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={imagePaths.logo.main || "/placeholder.svg"}
              alt="Mavericks Agency"
              width={200}
              height={40}
              className="h-8 md:h-[45px] w-auto hover:opacity-90 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/work" className="text-gray-700 hover:text-gray-900 transition-colors">
              {t("nav.work")}
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
              {t("nav.about")}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
              {t("nav.contact")}
            </Link>
          </nav>

          {/* Right side - Language switcher and Apply button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <AnimatedButton
              href="/apply"
              className="text-sm bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600"
            >
              {t("nav.apply")}
            </AnimatedButton>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-1" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-3 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/work"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.work")}
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.contact")}
              </Link>
              <div className="pt-2 border-t border-gray-100">
                <LanguageSwitcher />
              </div>
              <div className="pt-2">
                <AnimatedButton
                  href="/apply"
                  className="w-full text-center text-sm py-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.apply")}
                </AnimatedButton>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
