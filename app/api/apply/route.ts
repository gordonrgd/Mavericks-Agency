import { NextRequest, NextResponse } from "next/server"
import { escapeHtml } from "@/lib/sanitize"
import {
  getNotificationTo,
  getOutboundFrom,
  sendTransactionalMail,
} from "@/lib/email/send-transactional"

const MAX_FIELD_LENGTH = 2000
const MAX_ENTRIES = 80

function safeString(value: unknown): string {
  if (value === null || value === undefined) return ""
  const s = String(value)
  return s.length > MAX_FIELD_LENGTH ? s.slice(0, MAX_FIELD_LENGTH) + "…" : s
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json()

    if (!formData || typeof formData !== "object") {
      return NextResponse.json(
        { ok: false, error: "Données invalides." },
        { status: 400 }
      )
    }

    const entries = Object.entries(formData)
    if (entries.length > MAX_ENTRIES) {
      return NextResponse.json(
        { ok: false, error: "Formulaire trop volumineux." },
        { status: 400 }
      )
    }

    let from: string
    let to: string
    try {
      from = getOutboundFrom()
      to = getNotificationTo()
    } catch (configErr) {
      console.error("❌ Configuration e-mail:", configErr)
      return NextResponse.json(
        {
          ok: false,
          error:
            configErr instanceof Error
              ? configErr.message
              : "Configuration e-mail incomplète.",
        },
        { status: 500 }
      )
    }

    const html =
      "<h2>Nouvelle candidature reçue</h2><ul>" +
      entries
        .map(([key, value]) => {
          const label = escapeHtml(key)
          const val =
            typeof value === "boolean"
              ? value
                ? "Oui"
                : "Non"
              : escapeHtml(safeString(value))
          return `<li><b>${label}:</b> ${val}</li>`
        })
        .join("") +
      "</ul>"

    const subject = "Nouvelle candidature via le site Mavericks Agency"
    const text = JSON.stringify(formData, null, 2)

    await sendTransactionalMail({
      from,
      to,
      subject,
      text,
      html,
      replyTo:
        typeof formData.email === "string" && formData.email.includes("@")
          ? String(formData.email).trim()
          : undefined,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email:", error)
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Erreur inconnue lors de l'envoi de l'email",
      },
      { status: 500 }
    )
  }
}
