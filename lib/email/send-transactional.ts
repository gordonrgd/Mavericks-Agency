import nodemailer from "nodemailer"
import { Resend } from "resend"
import { resolveSmtpSecure } from "@/lib/smtp-config"

export type TransactionalMail = {
  to: string
  from: string
  subject: string
  text: string
  html: string
  replyTo?: string
}

/** Expéditeur affiché (Resend : domaine vérifié ; SMTP Proton : adresse autorisée sur le compte). */
export function getOutboundFrom(): string {
  const v =
    process.env.RESEND_FROM?.trim() ||
    process.env.SMTP_FROM?.trim() ||
    process.env.EMAIL_FROM?.trim() ||
    process.env.SMTP_USER?.trim()
  if (!v) {
    throw new Error(
      "Définissez RESEND_FROM, SMTP_FROM ou EMAIL_FROM (ou SMTP_USER pour SMTP seul)."
    )
  }
  return v
}

/** Boîte qui reçoit les notifications (formulaires). Peut être contact@domaine (MX Cloudflare → Proton). */
export function getNotificationTo(): string {
  const v =
    process.env.SMTP_TO?.trim() ||
    process.env.NOTIFICATION_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim()
  if (!v) {
    throw new Error("Définissez SMTP_TO, NOTIFICATION_EMAIL ou SMTP_USER.")
  }
  return v
}

function missingSmtpVars(): string[] {
  const keys = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD"] as const
  return keys.filter((k) => !process.env[k]?.trim())
}

/**
 * Envoie un e-mail transactionnel.
 *
 * 1) Si `RESEND_API_KEY` est défini : envoi via API Resend (`from` = getOutboundFrom() côté appelant).
 * 2) Sinon : SMTP (ex. Proton smtp.protonmail.ch:587).
 */
export async function sendTransactionalMail(mail: TransactionalMail): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY?.trim()

  if (resendKey) {
    const resend = new Resend(resendKey)
    const { data, error } = await resend.emails.send({
      from: mail.from,
      to: [mail.to],
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      replyTo: mail.replyTo,
    })
    if (error) {
      throw new Error(error.message || "Resend: envoi refusé")
    }
    if (!data?.id) {
      throw new Error("Resend: aucun identifiant de message")
    }
    return
  }

  const missing = missingSmtpVars()
  if (missing.length > 0) {
    throw new Error(
      `SMTP incomplet (${missing.join(", ")}). Ou bien configurez RESEND_API_KEY pour l’API Resend.`
    )
  }

  const host = process.env.SMTP_HOST!.trim()
  const port = Number.parseInt(process.env.SMTP_PORT!.trim(), 10) || 465
  const user = process.env.SMTP_USER!.trim()
  const pass = process.env.SMTP_PASSWORD!

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: resolveSmtpSecure(port),
    requireTLS: port === 587,
    auth: { user, pass },
    tls: { minVersion: "TLSv1.2" },
  })

  await transporter.sendMail({
    from: mail.from,
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    replyTo: mail.replyTo,
  })
}
