"use client"

import Link from "next/link"
import AnimatedSection from "@/components/animated-section"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"
import { getBlogSummaries } from "@/lib/blog-articles"
import { BookOpen, ArrowRight, ListChecks } from "lucide-react"

export default function ResourcesPage() {
  const { language } = useLanguage()
  const currentTranslations = translations[language]
  const blogSummaries = getBlogSummaries(language)

  const playbookItems = currentTranslations.resources.playbook.items

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-20">
      {/* Hero */}
      <section className="py-14 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 md:mb-6 leading-tight">
              {currentTranslations.resources.hero.title}
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {currentTranslations.resources.hero.subtitle}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Playbook — real on-page content */}
      <section className="pb-14 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <ListChecks className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug">
                    {currentTranslations.resources.playbook.title}
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
                    {currentTranslations.resources.playbook.intro}
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {playbookItems.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-gray-700 mt-2 flex-shrink-0" aria-hidden />
                    <span className="text-gray-700 text-sm sm:text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-xs sm:text-sm mt-8 pt-6 border-t border-gray-100 leading-relaxed">
                {currentTranslations.resources.playbook.footnote}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-10 md:mb-12">
              <div className="inline-flex items-center justify-center w-11 h-11 bg-gray-900 text-white rounded-full mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {currentTranslations.resources.blog.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                {currentTranslations.resources.blog.subtitle}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {blogSummaries.map((article, index) => (
              <AnimatedSection key={article.slug} delay={index * 0.05}>
                <Link
                  href={`/resources/articles/${article.slug}`}
                  className="group h-full flex flex-col bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:border-gray-900 hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug group-hover:text-gray-800">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{article.description}</p>
                  <span className="inline-flex self-start items-center gap-1 text-sm font-medium text-gray-900">
                    {currentTranslations.resources.blog.readArticle}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & CTAs */}
      <section className="py-14 md:py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 md:p-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                {currentTranslations.resources.other.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
                {currentTranslations.resources.other.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mb-8">
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base group"
                >
                  {currentTranslations.resources.other.faqButton}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
                >
                  {currentTranslations.resources.other.contactButton}
                </Link>
              </div>

              <p className="text-gray-500 text-sm mb-3">{currentTranslations.resources.other.contactText}</p>
              <p className="text-gray-600 text-sm mb-4">{currentTranslations.resources.other.applyText}</p>
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-medium text-sm sm:text-base"
              >
                {currentTranslations.resources.other.applyButton}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
