"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Instagram } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Icône TikTok simplifiée dans le même style qu'Instagram
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
)

export default function Footer() {
  const { t } = useLanguage()
  const [mobileOpenSection, setMobileOpenSection] = useState<"navigation" | "info" | "social" | null>(null)

  const toggleMobileSection = (section: "navigation" | "info" | "social") => {
    setMobileOpenSection((prev) => (prev === section ? null : section))
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t("footer.navigation")}</h4>
            <div className="space-y-2">
              <Link href="/services" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t("nav.services")}
              </Link>
              <Link href="/about" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t("nav.about")}
              </Link>
              <Link href="/contact" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t("nav.contact")}
              </Link>
            </div>
          </div>

          {/* Informations */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t("footer.informations")}</h4>
            <div className="space-y-2">
              <Link href="/faq" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t("nav.faq")}
              </Link>
              <Link href="/resources" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t("nav.resources")}
              </Link>
              <Link href="/privacy" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t("footer.confidentiality")}
              </Link>
              <Link href="/legal" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t("footer.legalNotice")}
              </Link>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">{t("footer.followUs")}</h4>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/mavericksagcy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-md hover:bg-gray-100"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-md hover:bg-gray-100"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="md:hidden space-y-3">
          <div className="border border-gray-200 rounded-lg bg-white">
            <button
              onClick={() => toggleMobileSection("navigation")}
              className="w-full px-4 py-3 flex items-center justify-between text-left"
              aria-expanded={mobileOpenSection === "navigation"}
            >
              <span className="font-semibold text-gray-900">{t("footer.navigation")}</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  mobileOpenSection === "navigation" ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileOpenSection === "navigation" && (
              <div className="px-4 pb-4 space-y-2 border-t border-gray-100">
                <Link href="/services" className="block text-gray-600 hover:text-gray-900 transition-colors pt-2">
                  {t("nav.services")}
                </Link>
                <Link href="/about" className="block text-gray-600 hover:text-gray-900 transition-colors">
                  {t("nav.about")}
                </Link>
                <Link href="/contact" className="block text-gray-600 hover:text-gray-900 transition-colors">
                  {t("nav.contact")}
                </Link>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg bg-white">
            <button
              onClick={() => toggleMobileSection("info")}
              className="w-full px-4 py-3 flex items-center justify-between text-left"
              aria-expanded={mobileOpenSection === "info"}
            >
              <span className="font-semibold text-gray-900">{t("footer.informations")}</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  mobileOpenSection === "info" ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileOpenSection === "info" && (
              <div className="px-4 pb-4 space-y-2 border-t border-gray-100">
                <Link href="/faq" className="block text-gray-600 hover:text-gray-900 transition-colors pt-2">
                  {t("nav.faq")}
                </Link>
                <Link href="/resources" className="block text-gray-600 hover:text-gray-900 transition-colors">
                  {t("nav.resources")}
                </Link>
                <Link href="/privacy" className="block text-gray-600 hover:text-gray-900 transition-colors">
                  {t("footer.confidentiality")}
                </Link>
                <Link href="/legal" className="block text-gray-600 hover:text-gray-900 transition-colors">
                  {t("footer.legalNotice")}
                </Link>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg bg-white">
            <button
              onClick={() => toggleMobileSection("social")}
              className="w-full px-4 py-3 flex items-center justify-between text-left"
              aria-expanded={mobileOpenSection === "social"}
            >
              <span className="font-semibold text-gray-900">{t("footer.followUs")}</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  mobileOpenSection === "social" ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileOpenSection === "social" && (
              <div className="px-4 pb-4 flex space-x-3 border-t border-gray-100 pt-3">
                <a
                  href="https://instagram.com/mavericksagcy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-md hover:bg-gray-100"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-md hover:bg-gray-100"
                  aria-label="Follow us on TikTok"
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>©2026 Mavericks Agency LLC. {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
