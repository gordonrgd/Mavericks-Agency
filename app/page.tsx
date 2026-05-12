"use client"

import Link from "next/link"
import { ArrowRight, Search, BarChart3, Settings, Shield, Scale, Lock, TrendingUp, Check } from "lucide-react"

import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import AnimatedSection from "@/components/animated-section"
import IncomeCalculator from "@/components/income-calculator"

export default function HomePage() {
  const { t, language } = useLanguage()
  const currentTranslations = translations[language]

  return (
    <div className="scroll-snap-y">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-white scroll-snap-start pt-16 md:pt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-5 md:mb-6 leading-[1.15] md:leading-tight">
              {t("home.hero.title")} <span className="text-gray-600">{t("home.hero.titleHighlight1")}</span> & <span className="text-gray-600">{t("home.hero.titleHighlight2")}</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t("home.hero.subtitle")}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <Button asChild size="lg">
              <Link href="/apply">
                {t("home.hero.cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Social Proof Section */}
      {/*<section className="py-12 bg-gray-50 scroll-snap-start">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t("home.socialProof.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("home.socialProof.subtitle")}
            </p>
          </AnimatedSection>
        </div>
      </section>*/}

      {/* We Care About You Section */}
      <section className="py-20 scroll-snap-start">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t("home.care.title")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("home.care.subtitle")}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection delay={0.1}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t("home.care.security.title")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("home.care.security.description")}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6">
                  <Scale className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t("home.care.legal.title")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("home.care.legal.description")}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t("home.care.opportunities.title")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("home.care.opportunities.description")}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6">
                  <Lock className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t("home.care.privacy.title")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("home.care.privacy.description")}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 scroll-snap-start">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-gray-900 mb-12 md:mb-16 text-center">{t("home.services.title")}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Free Audit */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
                  <Search size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("home.services.freeAudit.title")}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{t("home.services.freeAudit.description")}</p>
                <Button asChild className="h-10 px-4 bg-black text-white hover:bg-gray-800">
                  <Link href="/apply">
                    {t("home.services.freeAudit.cta")}
                  </Link>
                </Button>
              </div>
            </AnimatedSection>

            {/* Card 2 - 360° Support */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
                  <BarChart3 size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("home.services.support360.title")}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{t("home.services.support360.description")}</p>
              </div>
            </AnimatedSection>

            {/* Card 3 - Growth Retainer */}
            <AnimatedSection delay={0.3}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
                  <Settings size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("home.services.growthRetainer.title")}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{t("home.services.growthRetainer.description")}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50 scroll-snap-start">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t("home.timeline.title")}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-3 md:mb-0">
                {t("home.timeline.subtitle")}
              </p>
            </div>
          </AnimatedSection>

          {/* Timeline avec progression */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <AnimatedSection delay={0.1}>
                <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-md hover:shadow-lg transition-shadow duration-300 relative h-full">
                  {/* Badge numéro semaine */}
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-md">
                      1
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 mt-2">
                    {t("home.timeline.week1.title")}
                  </h3>
                  <ul className="space-y-3">
                    {currentTranslations.home.timeline.week1.items.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-md hover:shadow-lg transition-shadow duration-300 relative h-full">
                  {/* Badge numéro semaine */}
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-md">
                      2
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 mt-2">
                    {t("home.timeline.week2.title")}
                  </h3>
                  <ul className="space-y-3">
                    {currentTranslations.home.timeline.week2.items.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-md hover:shadow-lg transition-shadow duration-300 relative h-full">
                  {/* Badge numéro semaine */}
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-md">
                      3
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 mt-2">
                    {t("home.timeline.week3.title")}
                  </h3>
                  <ul className="space-y-3">
                    {currentTranslations.home.timeline.week3.items.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-gray-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section 
      <section className="py-20 scroll-snap-start">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <blockquote className="text-3xl font-light text-gray-900 mb-8 leading-relaxed">
              &ldquo;{t("home.testimonial.quote")}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden mr-4 flex-shrink-0">
                <Image
                  src="/images/testimonials/samantra-profile.webp"
                  alt={t("home.testimonial.author")}
                  width={60}
                  height={60}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">{t("home.testimonial.author")}</p>
                <p className="text-gray-600">{t("home.testimonial.role")}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>*/}

      {/* Income Calculator Section */}
      <section className="py-20 bg-gray-50 scroll-snap-start">
        <div className="max-w-7xl mx-auto px-6">
          <IncomeCalculator />
        </div>
      </section>
    </div>
  )
}
