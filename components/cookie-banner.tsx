"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useCookieConsent } from "@/contexts/cookie-consent-context"
import { Button } from "@/components/ui/button"

export default function CookieBanner() {
  const { t } = useLanguage()
  const { acceptMarketing, rejectMarketing } = useCookieConsent()

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-gray-200 bg-white/95 backdrop-blur-sm shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p id="cookie-banner-title" className="font-semibold text-gray-900 text-sm md:text-base">
            {t("cookieConsent.title")}
          </p>
          <p id="cookie-banner-desc" className="text-sm text-gray-600 mt-1">
            {t("cookieConsent.description")}{" "}
            <Link href="/privacy" className="underline hover:text-gray-900">
              {t("cookieConsent.privacyLink")}
            </Link>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <Button type="button" variant="outline" onClick={rejectMarketing}>
            {t("cookieConsent.reject")}
          </Button>
          <Button type="button" onClick={acceptMarketing}>
            {t("cookieConsent.accept")}
          </Button>
        </div>
      </div>
    </div>
  )
}
