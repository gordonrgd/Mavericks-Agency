import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const file = path.join(__dirname, "..", "lib", "translations.ts")

let s = fs.readFileSync(file, "utf8")

/** Remove `// Comment\n    key: { ... },` where `{`/`}` are balanced (depth from first `{` after key). */
function removeKeyedBlock(src, lineComment, keyName) {
  const needle = `${lineComment}\n    ${keyName}: {`
  let i = 0
  for (;;) {
    const start = src.indexOf(needle, i)
    if (start === -1) return src
    let depth = 0
    let pos = start + needle.length - 1 // position of first `{`
    depth = 1
    pos++
    while (pos < src.length && depth > 0) {
      const c = src[pos]
      if (c === "{") depth++
      else if (c === "}") depth--
      pos++
    }
    // expect `,` after closing `}`
    let end = pos
    while (end < src.length && /\s/.test(src[end])) end++
    if (src[end] === ",") end++
    src = src.slice(0, start) + src.slice(end)
    i = start
  }
}

s = removeKeyedBlock(s, "    // Apply Page", "apply")
s = removeKeyedBlock(s, "    // Application Received Page", "applicationReceived")

fs.writeFileSync(file, s)
console.log("OK: removed apply + applicationReceived from translations.ts")
