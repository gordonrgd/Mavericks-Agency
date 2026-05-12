"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getBlogArticle } from "@/lib/blog-articles"
import type { ArticleBlock } from "@/lib/blog-articles"
import AnimatedSection from "@/components/animated-section"

function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose prose-gray max-w-none">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "lead":
            return (
              <p key={i} className="text-lg text-gray-600 leading-relaxed mb-8 not-prose">
                {block.text}
              </p>
            )
          case "h2":
            return (
              <h2 key={i} className="text-xl sm:text-2xl font-semibold text-gray-900 mt-10 mb-4 not-prose">
                {block.text}
              </h2>
            )
          case "p":
            return (
              <p key={i} className="text-gray-700 text-[15px] sm:text-base leading-relaxed mb-4 not-prose">
                {block.text}
              </p>
            )
          case "ul":
            return (
              <ul key={i} className="list-disc pl-5 space-y-2 text-gray-700 text-[15px] sm:text-base leading-relaxed mb-6 not-prose">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )
          case "mistake":
            return (
              <div key={i} className="mb-8 not-prose">
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  <span className="text-gray-500 font-medium mr-2">{block.n}.</span>
                  {block.title}
                </h3>
                <p className="text-gray-700 text-[15px] sm:text-base leading-relaxed">{block.text}</p>
              </div>
            )
          case "callout":
            return (
              <div
                key={i}
                className="mt-10 p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 leading-relaxed not-prose"
              >
                {block.text}
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}

export default function BlogArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const { language, t } = useLanguage()
  const article = getBlogArticle(slug, language)

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-20 pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-gray-600 mb-6">{t("resources.articleNotFound")}</p>
          <Link href="/resources" className="text-gray-900 font-medium underline underline-offset-4">
            ← {t("resources.backToResources")}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 md:pt-20 pb-16 md:pb-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <Link
            href="/resources"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-0.5 transition-transform" />
            {t("resources.backToResources")}
          </Link>

          <p className="text-sm text-gray-500 mb-3">{article.readTime}</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">{article.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-10">{article.description}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <ArticleBlocks blocks={article.blocks} />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mt-14 pt-10 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex justify-center items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
            >
              {t("resources.articleCtaContact")}
            </Link>
            <Link
              href="/apply"
              className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              {t("resources.articleCtaApply")}
            </Link>
          </div>
        </AnimatedSection>
      </article>
    </div>
  )
}
