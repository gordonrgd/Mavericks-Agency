"use client"

import type React from "react"
import localFont from "next/font/local"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import MetaPixel from "@/components/meta-pixel"
import { Toaster } from "sonner"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"

const hellix = localFont({
  src: [
    {
      path: "../public/fonts/Hellix-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/Hellix-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Hellix-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Hellix-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Hellix-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Hellix-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Hellix-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/Hellix-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Hellix-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Hellix-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Hellix-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/Hellix-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Hellix-ExtraBoldItalic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-hellix",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Mavericks Agency | Influencer Marketing Agency</title>
        <meta name="description" content="Nous développons les créateurs OnlyFans grâce à une gestion stratégique, l'optimisation de contenu et la maximisation des revenus." />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={`${hellix.variable} font-sans`}>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster richColors position="top-center" />
          <Analytics />
          <MetaPixel />
        </LanguageProvider>
      </body>
    </html>
  )
}
