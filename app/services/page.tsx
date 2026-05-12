"use client"

import Link from "next/link"
import AnimatedSection from "@/components/animated-section"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"
import { Video, Image as ImageIcon, MessageSquare, Users, Zap, Target, Settings, Shield, TrendingUp, BarChart3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  const { t, language } = useLanguage()
  const currentTranslations = translations[language]

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5 md:mb-6 leading-tight">
              {t("nav.services")}
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
              {t("services.hero.subtitle")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Account Management */}
            <AnimatedSection delay={0.1}>
              <div className="group bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-300 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="h-7 w-7" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {t("services.accountManagement.title")}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t("services.accountManagement.description")}
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.accountManagement.item1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.accountManagement.item2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.accountManagement.item3")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.accountManagement.item4")}</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            {/* Chat & Engagement */}
            <AnimatedSection delay={0.2}>
              <div className="group bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-300 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-7 w-7" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {t("services.chatEngagement.title")}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t("services.chatEngagement.description")}
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.chatEngagement.item1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.chatEngagement.item2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.chatEngagement.item3")}</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            {/* Marketing & Acquisition */}
            <AnimatedSection delay={0.3}>
              <div className="group bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-300 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {t("services.marketing.title")}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t("services.marketing.description")}
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.marketing.item1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.marketing.item2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.marketing.item3")}</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            {/* Technical Support */}
            <AnimatedSection delay={0.4}>
              <div className="group bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-300 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-7 w-7" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {t("services.technicalSupport.title")}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t("services.technicalSupport.description")}
                </p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.technicalSupport.item1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.technicalSupport.item2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.technicalSupport.item3")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-700 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-600">{t("services.technicalSupport.item4")}</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Across All Platforms Section */}
      <section className="py-14 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12 md:mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                {t("home.platforms.title")}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
                {t("home.platforms.subtitle")}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
            {currentTranslations.home.platforms.items.map((item: { title: string; description: string }, index: number) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-full mb-4">
                    {index === 0 && <Video className="h-5 w-5" />}
                    {index === 1 && <ImageIcon className="h-5 w-5" />}
                    {index === 2 && <MessageSquare className="h-5 w-5" />}
                    {index === 3 && <Users className="h-5 w-5" />}
                    {index === 4 && <Zap className="h-5 w-5" />}
                    {index === 5 && <Target className="h-5 w-5" />}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <p className="text-center text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
              {t("home.platforms.conclusion")}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6">
                <BarChart3 className="h-8 w-8" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {t("services.philosophy.title")}
              </h2>
              
              <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                {t("services.philosophy.subtitle")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    {t("services.philosophy.contactCta")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group">
                  <Link href="/apply">
                    {t("services.philosophy.auditCta")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
              
              <p className="text-gray-500 mt-6 text-sm">
                {t("services.philosophy.footnote")}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}