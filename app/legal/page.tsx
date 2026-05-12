"use client"

import Link from "next/link"
import AnimatedSection from "@/components/animated-section"
import { useLanguage } from "@/contexts/language-context"

const card =
  "bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8"
const h2 = "text-xl sm:text-2xl font-semibold text-gray-900 mb-5 md:mb-6 leading-snug"
const linkClass =
  "text-gray-900 font-medium underline underline-offset-4 decoration-gray-400 hover:decoration-gray-900 transition-colors"

export default function LegalPage() {
  const { t } = useLanguage()
  const contactEmail = t("contact.info.emailAddress")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-10 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-5 leading-tight">
              {t("legal.hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("legal.hero.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-6 md:space-y-8">
          <AnimatedSection delay={0.05}>
            <section className={card} aria-labelledby="legal-publisher">
              <h2 id="legal-publisher" className={h2}>
                {t("legal.sections.publisher.title")}
              </h2>
              <dl className="space-y-4 text-[15px] sm:text-base text-gray-700 leading-relaxed">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    {t("legal.sections.publisher.company")}
                  </dt>
                  <dd className="text-gray-900 mt-1">Mavericks Agency</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    {t("legal.sections.publisher.status")}
                  </dt>
                  <dd className="text-gray-900 mt-1">LLC</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    {t("legal.sections.publisher.email")}
                  </dt>
                  <dd className="mt-1">
                    <a href={`mailto:${contactEmail}`} className={linkClass}>
                      {contactEmail}
                    </a>
                  </dd>
                </div>
              </dl>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <section className={card} aria-labelledby="legal-publication">
              <h2 id="legal-publication" className={h2}>
                {t("legal.sections.publicationManager.title")}
              </h2>
              <p className="text-gray-700 text-[15px] sm:text-base leading-relaxed">
                {t("legal.sections.publicationManager.content")}
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <section className={card} aria-labelledby="legal-hosting">
              <h2 id="legal-hosting" className={h2}>
                {t("legal.sections.hosting.title")}
              </h2>
              <dl className="space-y-4 text-[15px] sm:text-base text-gray-700 leading-relaxed">
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    {t("legal.sections.hosting.company")}
                  </dt>
                  <dd className="text-gray-900 mt-1">Hetzner Online GmbH</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    {t("legal.sections.hosting.address")}
                  </dt>
                  <dd className="text-gray-900 mt-1">
                    Industriestr. 25, 91710 Gunzenhausen, Germany
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    {t("legal.sections.hosting.website")}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href="https://www.hetzner.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      www.hetzner.com
                    </a>
                  </dd>
                </div>
              </dl>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <section className={card} aria-labelledby="legal-ip">
              <h2 id="legal-ip" className={h2}>
                {t("legal.sections.intellectualProperty.title")}
              </h2>
              <p className="text-gray-700 text-[15px] sm:text-base leading-relaxed">
                {t("legal.sections.intellectualProperty.content")}
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <section className={card} aria-labelledby="legal-data">
              <h2 id="legal-data" className={h2}>
                {t("legal.sections.dataProtection.title")}
              </h2>
              <p className="text-gray-700 text-[15px] sm:text-base leading-relaxed">
                {t("legal.sections.dataProtection.content")}{" "}
                <a href={`mailto:${contactEmail}`} className={linkClass}>
                  {contactEmail}
                </a>
                .
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <section className={card} aria-labelledby="legal-terms">
              <h2 id="legal-terms" className={h2}>
                {t("legal.sections.termsOfUse.title")}
              </h2>
              <p className="text-gray-700 text-[15px] sm:text-base leading-relaxed">
                {t("legal.sections.termsOfUse.content")}
              </p>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={0.35}>
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6 sm:p-8 text-center text-sm sm:text-base text-gray-600 leading-relaxed">
              {t("legal.footer.note")}{" "}
              <Link href="/privacy" className={`inline ${linkClass}`}>
                {t("legal.footer.privacyLink")}
              </Link>
              .
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
