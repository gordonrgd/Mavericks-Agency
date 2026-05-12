/** Nodemailer `secure`: true for SMTPS (typically port 465), false for STARTTLS (often 587). */
export function resolveSmtpSecure(port: number): boolean {
  const explicit = process.env.SMTP_SECURE
  if (explicit === "true") return true
  if (explicit === "false") return false
  return port === 465
}
