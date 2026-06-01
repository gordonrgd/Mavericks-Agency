"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import CookieBanner from "@/components/cookie-banner"
import {
  type CookieConsentChoice,
  getStoredCookieConsent,
  persistCookieConsent,
} from "@/lib/cookie-consent"

interface CookieConsentContextValue {
  hydrated: boolean
  choice: CookieConsentChoice | null
  marketingConsent: boolean
  acceptMarketing: () => void
  rejectMarketing: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(
  undefined
)

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false)
  const [choice, setChoice] = useState<CookieConsentChoice | null>(null)

  useEffect(() => {
    setChoice(getStoredCookieConsent())
    setHydrated(true)
  }, [])

  const acceptMarketing = useCallback(() => {
    persistCookieConsent("accepted")
    setChoice("accepted")
  }, [])

  const rejectMarketing = useCallback(() => {
    persistCookieConsent("rejected")
    setChoice("rejected")
  }, [])

  const marketingConsent = choice === "accepted"

  return (
    <CookieConsentContext.Provider
      value={{
        hydrated,
        choice,
        marketingConsent,
        acceptMarketing,
        rejectMarketing,
      }}
    >
      {children}
      {hydrated && choice === null ? <CookieBanner /> : null}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider")
  }
  return context
}
