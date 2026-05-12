"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import AnimatedSection from "./animated-section"

export default function IncomeCalculator() {
  const { t, language } = useLanguage()
  const [subscribers, setSubscribers] = useState(1000)
  const [price, setPrice] = useState(10)

  // Calculate monthly revenue (OnlyFans takes 20%, so 80% for creator)
  const monthlyRevenue = Math.round(subscribers * price * 0.8)
  
  // Format number with spaces for thousands
  const formatNumber = (num: number) => {
    const locale = language === "fr" ? "fr-FR" : language === "es" ? "es-ES" : "en-US"
    return num.toLocaleString(locale)
  }

  return (
    <AnimatedSection>
      <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          {t("home.calculator.title")}
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          {t("home.calculator.subtitle")}
        </p>

        <div className="space-y-6">
          {/* Subscribers Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("home.calculator.subscribers")}: {formatNumber(subscribers)}
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={subscribers}
              onChange={(e) => setSubscribers(Number.parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>10,000</span>
            </div>
          </div>

          {/* Price Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("home.calculator.price")}: ${price}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={price}
              onChange={(e) => setPrice(Number.parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$1</span>
              <span>$50</span>
            </div>
          </div>

          {/* Result */}
          <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              {t("home.calculator.monthlyRevenue")}
            </p>
            <p className="text-4xl font-bold text-gray-900">
              ${formatNumber(monthlyRevenue)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              ({t("home.calculator.onlyfansCommission")})
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

