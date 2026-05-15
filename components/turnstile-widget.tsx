"use client"

import { forwardRef } from "react"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()

export const isTurnstileWidgetConfigured = Boolean(siteKey)

type Props = {
  onSuccess: (token: string) => void
  onExpire?: () => void
  /** Distinction analytics côté Cloudflare (optionnel) */
  action?: string
}

const TurnstileWidget = forwardRef<TurnstileInstance | null, Props>(
  function TurnstileWidgetInner({ onSuccess, onExpire, action }, ref) {
    if (!siteKey) return null
    return (
      <div className="flex justify-center py-1">
        <Turnstile
          ref={ref}
          siteKey={siteKey}
          onSuccess={onSuccess}
          onExpire={onExpire}
          options={{ theme: "auto", size: "normal", action }}
        />
      </div>
    )
  }
)

export default TurnstileWidget
