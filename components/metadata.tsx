"use client"

import Head from "next/head"
import { useLanguage } from "@/contexts/language-context"

interface MetadataProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: "website" | "article"
}

export function Metadata({ 
  title, 
  description, 
  keywords, 
  image = "/images/logo/mavericks-logo.png",
  url,
  type = "website"
}: MetadataProps) {
  const { t, language } = useLanguage()
  
  const defaultTitle = "Mavericks Agency | Influencer Marketing Agency"
  const defaultDescription = t("meta.description")
  const defaultKeywords = "influencer marketing, management, agency, social media, content creation"
  
  const pageTitle = title ? `${title} | Mavericks Agency` : defaultTitle
  const pageDescription = description || defaultDescription
  const pageKeywords = keywords || defaultKeywords
  const pageUrl = url || typeof window !== 'undefined' ? window.location.href : ''
  const pageImage = image.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mavericks-agency.com'}${image}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="Mavericks Agency" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={language} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Mavericks Agency" />
      <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : 'en_US'} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:site" content="@mavericksagcy" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href={pageUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
    </Head>
  )
}

