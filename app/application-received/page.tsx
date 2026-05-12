"use client"

import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"
import AnimatedSection from "@/components/animated-section"
import { useLanguage } from "@/contexts/language-context"

export default function ApplicationReceivedPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 md:py-16">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="text-green-600" size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("applicationReceived.title")}
            </h1>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              {t("applicationReceived.nextSteps")}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {t("applicationReceived.step1.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("applicationReceived.step1.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {t("applicationReceived.step2.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("applicationReceived.step2.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {t("applicationReceived.step3.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("applicationReceived.step3.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">
                    {t("applicationReceived.step4.title")}
                  </h3>
                  <p className="text-gray-600">
                    {t("applicationReceived.step4.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="text-center">
            <Link
              href="/resources"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full hover:from-gray-800 hover:to-gray-600 transition-all duration-200 transform hover:scale-105 font-medium text-lg"
            >
              {t("applicationReceived.cta")}
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
