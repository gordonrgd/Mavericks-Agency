import { NextRequest, NextResponse } from "next/server"
import { escapeHtml, truncate } from "@/lib/sanitize"
import {
  getNotificationTo,
  getOutboundFrom,
  sendTransactionalMail,
} from "@/lib/email/send-transactional"
import { isTurnstileEnforced, verifyTurnstileToken } from "@/lib/turnstile"
import {
  parseMarketingCookiesAccepted,
  parseMetaEventId,
  splitFullName,
  trackMetaLeadServer,
} from "@/lib/meta-lead-server"

const MAX_NAME = 200
const MAX_MESSAGE = 5000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const turnstileToken =
      typeof body?.turnstileToken === "string" ? body.turnstileToken : undefined

    if (isTurnstileEnforced()) {
      const ok = await verifyTurnstileToken(turnstileToken)
      if (!ok) {
        return NextResponse.json(
          {
            ok: false,
            error: "Vérification anti-robots échouée ou expirée. Réessayez.",
          },
          { status: 400 }
        )
      }
    }

    const rawName = body?.name ?? ""
    const rawEmail = body?.email ?? ""
    const rawMessage = body?.message ?? ""

    const name = truncate(rawName, MAX_NAME)
    const email = String(rawEmail).trim().toLowerCase()
    const message = truncate(rawMessage, MAX_MESSAGE)

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Nom, email et message requis." },
        { status: 400 }
      )
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Email invalide." },
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

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>")

    await sendTransactionalMail({
      from,
      to,
      subject: "Nouveau message de contact du site Mavericks Agency",
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><b>Nom:</b> ${safeName}</p><p><b>Email:</b> ${safeEmail}</p><p><b>Message:</b><br/>${safeMessage}</p>`,
      replyTo: email,
    })

    const metaEventId = parseMetaEventId(body)
    if (metaEventId) {
      const { firstName, lastName } = splitFullName(name)
      await trackMetaLeadServer({
        req,
        eventId: metaEventId,
        contentName: "contact",
        marketingCookiesAccepted: parseMarketingCookiesAccepted(body),
        email,
        firstName,
        lastName,
      })
    }

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
