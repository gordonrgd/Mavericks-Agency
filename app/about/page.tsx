"use client"

import AnimatedSection from "@/components/animated-section"
import { Heart, Eye, Target, Award, Users, Lightbulb, TrendingUp, Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"

export default function AboutPage() {
  const { t, language } = useLanguage()
  const currentTranslations = translations[language]

  return (
    <div className="pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 md:mb-6 leading-tight">{t("about.title")}</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t("about.subtitle")}</p>
          </div>
        </AnimatedSection>

        {/* Story */}
        <section className="mb-20 md:mb-24">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8 md:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
                  {t("about.story.title")}
                </h2>
                <div className="space-y-5 text-gray-600 text-[15px] sm:text-base leading-relaxed">
                  <p>{t("about.story.p1")}</p>
                  <p>{t("about.story.p2")}</p>
                  <p>{t("about.story.p3")}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t("about.values.title")}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Heart,
                title: t("about.values.discretion.title"),
                description: t("about.values.discretion.description"),
              },
              {
                icon: Eye,
                title: t("about.values.results.title"),
                description: t("about.values.results.description"),
              },
              {
                icon: Target,
                title: t("about.values.support.title"),
                description: t("about.values.support.description"),
              },
            ].map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t("about.team.title")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("about.team.subtitle")}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {currentTranslations.about.team.members.founder.name}
                </h3>
                <p className="text-gray-600 font-medium mb-3">
                  {currentTranslations.about.team.members.founder.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {currentTranslations.about.team.members.founder.description}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center min-h-[280px]">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {currentTranslations.about.team.members.operations.name}
                </h3>
                <p className="text-gray-600 font-medium mb-3">
                  {currentTranslations.about.team.members.operations.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {currentTranslations.about.team.members.operations.description}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center min-h-[280px]">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {currentTranslations.about.team.members.partners.name}
                </h3>
                <p className="text-gray-600 font-medium mb-3">
                  {currentTranslations.about.team.members.partners.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {currentTranslations.about.team.members.partners.description}
                </p>
              </div>
            </AnimatedSection>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">{t("about.team.more")}</p>
        </section>

        {/* Our Approach Section */}
        <section className="mb-20">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">{t("home.approach.title")}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Target,
                title: t("home.approach.strategy.title"),
                description: t("home.approach.strategy.description"),
              },
              {
                icon: Lightbulb,
                title: t("home.approach.content.title"),
                description: t("home.approach.content.description"),
              },
              {
                icon: TrendingUp,
                title: t("home.approach.growth.title"),
                description: t("home.approach.growth.description"),
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mb-20 bg-gray-50 rounded-2xl p-12">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              {t("home.comparison.title")}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto md:items-stretch">
            <AnimatedSection delay={0.1} className="h-full">
              <div className="bg-white rounded-lg border-2 border-gray-900 p-8 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("home.comparison.mavericks.title")}
                </h3>
                <ul className="space-y-3 flex-1">
                  {currentTranslations.home.comparison.mavericks.items.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-gray-900 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="h-full">
              <div className="bg-white rounded-lg border border-gray-200 p-8 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("home.comparison.others.title")}
                </h3>
                <ul className="space-y-3 flex-1">
                  {currentTranslations.home.comparison.others.items.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-gray-50 rounded-2xl p-12 text-center">
          <AnimatedSection>
            <div className="flex justify-center mb-6">
              <Award className="h-12 w-12 text-gray-900" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("about.mission.title")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t("about.mission.description")}</p>
          </AnimatedSection>
        </section>
      </div>
    </div>
  )
}
