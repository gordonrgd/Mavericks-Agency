"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  variant?: "default" | "glow" | "gradient"
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  className,
  variant = "default",
}: AnimatedButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "glow":
        return "bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 shadow-lg hover:shadow-xl"
      case "gradient":
        return "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800"
      default:
        return "bg-gray-900 hover:bg-gray-800"
    }
  }

  const baseClasses = cn(
    "inline-flex items-center justify-center px-6 py-2 font-medium text-white rounded-full transition-all duration-200 ease-out transform hover:scale-105 active:scale-95",
    getVariantClasses(),
    className,
  )

  const ButtonContent = () => <div className={baseClasses}>{children}</div>

  if (href) {
    return (
      <a href={href} className="inline-block">
        <ButtonContent />
      </a>
    )
  }

  return (
    <button onClick={onClick} className="inline-block">
      <ButtonContent />
    </button>
  )
}
