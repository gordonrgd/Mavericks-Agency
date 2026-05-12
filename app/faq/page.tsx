"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, HelpCircle, Shield, CheckCircle, Scale, MessageSquare } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import AnimatedSection from "@/components/animated-section"
import { translations } from "@/lib/translations"

interface FAQItemProps {
  itemId: string
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

interface FAQSection {
  section: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  questions: Array<{
    question: string
    answer: string
  }>
}

function FAQItem({ itemId, question, answer, isOpen, onToggle }: FAQItemProps) {
  const panelId = `${itemId}-panel`
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        id={`${itemId}-trigger`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full px-5 py-4 sm:px-6 text-left bg-white hover:bg-gray-50/80 transition-colors flex items-start justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
      >
        <span className="font-medium text-gray-900 text-[15px] sm:text-base leading-snug">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>
      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={`${itemId}-trigger`}
          className="px-5 py-4 sm:px-6 bg-gray-50/90 border-t border-gray-100"
        >
          <div
            className="text-gray-600 text-sm sm:text-[15px] leading-relaxed prose prose-sm max-w-none prose-p:my-2 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{
              __html: answer.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  const { t, language } = useLanguage()
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const currentTranslations = translations[language]

  const faqData: FAQSection[] = [
    {
      section: "general",
      icon: HelpCircle,
      title: currentTranslations.faq.general.title,
      questions: [...currentTranslations.faq.general.questions]
    },
    {
      section: "privacy",
      icon: Shield,
      title: currentTranslations.faq.privacy.title,
      questions: [...currentTranslations.faq.privacy.questions]
    },
    {
      section: "guarantees",
      icon: CheckCircle,
      title: currentTranslations.faq.guarantees.title,
      questions: [...currentTranslations.faq.guarantees.questions]
    },
    {
      section: "legal",
      icon: Scale,
      title: currentTranslations.faq.legal.title,
      questions: [...currentTranslations.faq.legal.questions]
    }
  ]

  return (
    <div className="pt-16 md:pt-20 pb-16 md:pb-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 md:mb-6 leading-tight">
              {t("faq.title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("faq.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        {/* FAQ Sections */}
        <div className="space-y-8 md:space-y-10">
          {faqData.map((section, sectionIndex) => {
            const IconComponent = section.icon
            return (
              <AnimatedSection key={section.section} delay={sectionIndex * 0.1}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-6 md:mb-8">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 leading-snug pt-0.5">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {section.questions.map((item, itemIndex) => {
                      const itemKey = `${section.section}-${itemIndex}`
                      return (
                        <FAQItem
                          key={itemKey}
                          itemId={itemKey}
                          question={item.question}
                          answer={item.answer}
                          isOpen={openItems[itemKey] || false}
                          onToggle={() => toggleItem(itemKey)}
                        />
                      )
                    })}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>

        {/* CTA Section */}
        <AnimatedSection delay={0.3}>
          <div className="mt-12 md:mt-14 text-center">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                {t("faq.cta.title")}
              </h3>
              <p className="text-gray-600 mb-6 md:mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                {t("faq.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base"
                >
                  <MessageSquare className="mr-2 h-5 w-5 flex-shrink-0" aria-hidden />
                  {t("faq.cta.contact")}
                </Link>
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
                >
                  {t("faq.cta.apply")}
                </Link>
              </div>
              <p className="text-gray-500 text-xs mt-5 max-w-md mx-auto">{t("faq.cta.note")}</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
