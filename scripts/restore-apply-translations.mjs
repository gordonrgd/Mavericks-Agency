import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const target = path.join(root, "lib", "translations.ts")

const frApply = fs.readFileSync("/tmp/fr-apply.txt", "utf8").trimEnd() + "\n"
const frRecv = fs.readFileSync("/tmp/fr-apprecv.txt", "utf8").trimEnd() + "\n"
const enApply = fs.readFileSync("/tmp/en-apply.txt", "utf8").trimEnd() + "\n"
const enRecv = fs.readFileSync("/tmp/en-apprecv.txt", "utf8").trimEnd() + "\n"
const esApply = fs.readFileSync("/tmp/es-apply.txt", "utf8").trimEnd() + "\n"
const esRecv = fs.readFileSync("/tmp/es-apprecv.txt", "utf8").trimEnd() + "\n"

let s = fs.readFileSync(target, "utf8")

function insertBefore(hay, needle, insert) {
  const i = hay.indexOf(needle)
  if (i === -1) throw new Error("needle not found: " + needle.slice(0, 80))
  return hay.slice(0, i) + insert + hay.slice(i)
}

// FR: after services block, before // Footer
s = insertBefore(
  s,
  `        footnote: "Découvrez comment développer votre activité OnlyFans dans le monde entier",
      },
    },

    // Footer`,
  frApply + "\n"
)

s = insertBefore(
  s,
  `      copyright: "Tous droits réservés.",
    },

    // Common`,
  frRecv + "\n"
)

// EN
s = insertBefore(
  s,
  `        footnote: "Discover how to develop your OnlyFans business worldwide",
      },
    },

    // Footer`,
  enApply + "\n"
)

s = insertBefore(
  s,
  `      copyright: "All rights reserved.",
    },

    // Common`,
  enRecv + "\n"
)

// ES
s = insertBefore(
  s,
  `        footnote: "Descubre cómo desarrollar tu negocio OnlyFans en todo el mundo",
      },
    },

    // Footer`,
  esApply + "\n"
)

s = insertBefore(
  s,
  `      copyright: "Todos los derechos reservados.",
    },

    // Common`,
  esRecv + "\n"
)

fs.writeFileSync(target, s)
console.log("Restored apply + applicationReceived in translations.ts")
