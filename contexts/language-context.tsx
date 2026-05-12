"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { translations, type Language } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["fr", "en", "es"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
      document.cookie = `language=${savedLanguage}; path=/; max-age=31536000`
      return
    }
    const browserLanguages = navigator.languages || [navigator.language]
    for (const lang of browserLanguages) {
      const code = lang.toLowerCase()
      if (code.startsWith("fr")) {
        setLanguage("fr")
        localStorage.setItem("language", "fr")
        return
      }
      if (code.startsWith("es")) {
        setLanguage("es")
        localStorage.setItem("language", "es")
        return
      }
      if (code.startsWith("en")) {
        setLanguage("en")
        localStorage.setItem("language", "en")
        return
      }
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    document.cookie = `language=${lang}; path=/; max-age=31536000`
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if not found in fallback
          }
        }
        break
      }
    }

    return typeof value === "string" ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
