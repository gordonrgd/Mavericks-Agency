import type { Language } from "@/lib/translations"
import { blogArticleRegistry } from "./content"
import type { ArticleBlock, BlogArticleBody, BlogArticleSlug } from "./types"
import { BLOG_SLUGS } from "./types"

export type { ArticleBlock, BlogArticleBody, BlogArticleSlug }
export { BLOG_SLUGS }

export function isBlogArticleSlug(slug: string): slug is BlogArticleSlug {
  return (BLOG_SLUGS as readonly string[]).includes(slug)
}

export function getBlogArticle(slug: string, language: Language): BlogArticleBody | null {
  if (!isBlogArticleSlug(slug)) return null
  return blogArticleRegistry[slug][language] ?? null
}

export function getBlogSummaries(language: Language): Array<Pick<BlogArticleBody, "title" | "description"> & { slug: BlogArticleSlug }> {
  return BLOG_SLUGS.map((slug) => {
    const a = blogArticleRegistry[slug][language]
    return { slug, title: a.title, description: a.description }
  })
}
