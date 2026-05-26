/**
 * Génère favicon / icônes app à partir du logo (zone noire « MAVERICKS »).
 * Usage: node scripts/generate-favicon.mjs
 */
import sharp from "sharp"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const LOGO = path.join(ROOT, "public/images/logo/mavericks-logo.png")

async function blackBoxWidth() {
  const { data, info } = await sharp(LOGO).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  let right = 0
  for (let x = 0; x < width; x++) {
    let dark = 0
    for (let y = 0; y < height; y++) {
      const i = (y * width + x) * channels
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      if (r < 60 && g < 60 && b < 60) dark++
    }
    const ratio = dark / height
    if (ratio > 0.85) right = x
    else if (right > 0 && ratio < 0.1) break
  }
  return right + 1
}

async function cropMark() {
  const meta = await sharp(LOGO).metadata()
  const h = meta.height ?? 183
  const boxW = await blackBoxWidth()
  // Carré sur la partie gauche du bloc noir (lisible en petit)
  const cropW = Math.min(Math.max(h, Math.round(boxW * 0.42)), boxW)
  return sharp(LOGO).extract({ left: 0, top: 0, width: cropW, height: h }).png().toBuffer()
}

async function squarePng(source, size, padding = 0.08) {
  const inner = Math.round(size * (1 - padding * 2))
  return sharp(source)
    .resize(inner, inner, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .extend({
      top: Math.round(size * padding),
      bottom: Math.round(size * padding),
      left: Math.round(size * padding),
      right: Math.round(size * padding),
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toBuffer()
}

async function main() {
  const mark = await cropMark()
  await mkdir(path.join(ROOT, "app"), { recursive: true })

  const icon512 = await squarePng(mark, 512)
  const icon32 = await squarePng(mark, 32, 0.06)
  const apple180 = await squarePng(mark, 180)

  await writeFile(path.join(ROOT, "app/icon.png"), icon512)
  await writeFile(path.join(ROOT, "app/apple-icon.png"), apple180)
  await writeFile(path.join(ROOT, "public/favicon.png"), icon32)

  // favicon.ico multi-résolution
  const sizes = [16, 32, 48]
  const pngs = await Promise.all(sizes.map((s) => squarePng(mark, s, 0.06)))
  try {
    const toIco = (await import("to-ico")).default
    const ico = await toIco(pngs)
    await writeFile(path.join(ROOT, "app/favicon.ico"), ico)
    await writeFile(path.join(ROOT, "public/favicon.ico"), ico)
  } catch {
    await writeFile(path.join(ROOT, "app/favicon.ico"), pngs[1])
    await writeFile(path.join(ROOT, "public/favicon.ico"), pngs[1])
  }

  console.log("Favicons générés: app/icon.png, app/apple-icon.png, app/favicon.ico, public/favicon.png")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
