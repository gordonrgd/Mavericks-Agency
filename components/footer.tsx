"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Instagram } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

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
