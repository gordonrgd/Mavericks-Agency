"use client"

import AnimatedSection from "@/components/animated-section"
import { useLanguage } from "@/contexts/language-context"

export default function PrivacyPage() {
  const { t } = useLanguage()
  const contactEmail = t("contact.info.emailAddress")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 md:mb-6 leading-tight">
              {t("privacy.hero.title")}
            </h1>
          </div>
        </AnimatedSection>

        <div className="prose prose-lg max-w-none">
          <AnimatedSection delay={0.1}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("privacy.sections.dataCollected.title")}</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {t("privacy.sections.dataCollected.content")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("privacy.sections.usage.title")}</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {t("privacy.sections.usage.content")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("privacy.sections.security.title")}</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {t("privacy.sections.security.content")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("privacy.sections.sharing.title")}</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {t("privacy.sections.sharing.content")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("privacy.sections.retention.title")}</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {t("privacy.sections.retention.content")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("privacy.sections.userRights.title")}</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {t("privacy.sections.userRights.content")}{' '}
              <a 
                href={`mailto:${contactEmail}`} 
                className="text-gray-900 hover:text-gray-700 underline transition-colors"
              >
                {contactEmail}
              </a>
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.7}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("privacy.sections.cookies.title")}</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {t("privacy.sections.cookies.content")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.8}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("privacy.sections.modifications.title")}</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {t("privacy.sections.modifications.content")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.9}>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("privacy.contact.title")}</h3>
              <p className="text-gray-700">
                {t("privacy.contact.description")}{' '}
                <a 
                  href={`mailto:${contactEmail}`} 
                  className="text-gray-900 hover:text-gray-700 underline transition-colors font-medium"
                >
                  {contactEmail}
                </a>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
