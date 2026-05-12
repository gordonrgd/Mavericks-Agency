/**
 * Compare translation leaf paths across fr / en / es.
 * Run: npx tsx scripts/verify-translations.ts
 */
import { translations } from "../lib/translations"

type Lang = "fr" | "en" | "es"

function leafPaths(value: unknown, prefix = ""): Set<string> {
  const out = new Set<string>()
  if (typeof value === "string") {
    out.add(prefix)
    return out
  }
  if (value === null || typeof value !== "object") {
    out.add(prefix)
    return out
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      const p = `${prefix}[${i}]`
      leafPaths(item, p).forEach((k) => out.add(k))
    })
    return out
  }
  for (const k of Object.keys(value as object)) {
    const p = prefix ? `${prefix}.${k}` : k
    leafPaths((value as Record<string, unknown>)[k], p).forEach((x) => out.add(x))
  }
  return out
}

function reportMissing(reference: Set<string>, other: Set<string>, refLang: Lang, otherLang: Lang) {
  const missing = [...reference].filter((k) => !other.has(k)).sort()
  const extra = [...other].filter((k) => !reference.has(k)).sort()
  return { missing, extra }
}

const fr = leafPaths(translations.fr)
const en = leafPaths(translations.en)
const es = leafPaths(translations.es)

const union = new Set([...fr, ...en, ...es])

let exit = 0

for (const lang of ["en", "es"] as const) {
  const other = lang === "en" ? en : es
  const { missing, extra } = reportMissing(fr, other, "fr", lang)
  if (missing.length || extra.length) {
    exit = 1
    console.log(`\n--- vs fr → ${lang} ---`)
    if (missing.length) {
      console.log(`Missing in ${lang} (${missing.length}):`)
      missing.slice(0, 80).forEach((k) => console.log(`  - ${k}`))
      if (missing.length > 80) console.log(`  ... and ${missing.length - 80} more`)
    }
    if (extra.length) {
      console.log(`Extra only in ${lang} (${extra.length}):`)
      extra.slice(0, 80).forEach((k) => console.log(`  + ${k}`))
      if (extra.length > 80) console.log(`  ... and ${extra.length - 80} more`)
    }
  }
}

const onlyEn = [...en].filter((k) => !fr.has(k) || !es.has(k))
const onlyEs = [...es].filter((k) => !fr.has(k) || !en.has(k))
if (onlyEn.length && onlyEs.length === 0) {
  /* symmetric check en vs es */
}

const enEs = reportMissing(en, es, "en", "es")
if (enEs.missing.length || enEs.extra.length) {
  exit = 1
  console.log(`\n--- en vs es (symmetric diff) ---`)
  console.log(`In fr but not en: ${[...fr].filter((k) => !en.has(k)).length}`)
  console.log(`In fr but not es: ${[...fr].filter((k) => !es.has(k)).length}`)
  console.log(`In en but not es: ${enEs.missing.length}`)
  console.log(`In es but not en: ${enEs.extra.length}`)
}

console.log(`\nLeaf path counts: fr=${fr.size} en=${en.size} es=${es.size} union=${union.size}`)

if (exit === 0) {
  console.log("OK: fr / en / es have identical leaf paths.")
}

process.exit(exit)
