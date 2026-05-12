"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

import { useLanguage } from "@/contexts/language-context"
import { imagePaths } from "@/lib/image-paths"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "./language-switcher"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={imagePaths.logo.main || "/placeholder.svg"}
              alt="Mavericks Agency"
              width={300}
              height={42.22}
              className="h-[30px] w-[200px] md:h-[42.22px] md:w-[300px] hover:opacity-90 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-700 hover:text-gray-900 transition-colors">
              {t("nav.services")}
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
            <Button asChild>
              <Link href="/apply">
                {t("nav.apply")}
              </Link>
            </Button>
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
                href="/services"
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.services")}
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
                <Button asChild className="w-full">
                  <Link href="/apply" onClick={() => setIsMenuOpen(false)}>
                    {t("nav.apply")}
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
