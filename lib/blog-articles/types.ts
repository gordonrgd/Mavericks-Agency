import type { Language } from "@/lib/translations"

export type ArticleBlock =
  | { type: "lead"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "mistake"; n: number; title: string; text: string }
  | { type: "callout"; text: string }

export type BlogArticleBody = {
  title: string
  description: string
  readTime: string
  blocks: ArticleBlock[]
}

export const BLOG_SLUGS = [
  "onlyfans-growth-mistakes",
  "international-niche",
  "creator-anonymity",
  "free-to-paying-conversion",
] as const

export type BlogArticleSlug = (typeof BLOG_SLUGS)[number]

export type BlogArticleRegistry = Record<BlogArticleSlug, Record<Language, BlogArticleBody>>
