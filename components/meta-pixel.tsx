"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { useCookieConsent } from "@/contexts/cookie-consent-context"
import { flushPendingMetaLead } from "@/lib/meta-lead-client"
import { isMetaPixelEnabled, META_PIXEL_ID, trackMetaEvent } from "@/lib/meta-pixel"

export default function MetaPixel() {
  const pathname = usePathname()
  const { hydrated, marketingConsent } = useCookieConsent()
  const skipNextPageView = useRef(true)

  useEffect(() => {
    if (!hydrated || !marketingConsent || !isMetaPixelEnabled()) return
    if (skipNextPageView.current) {
      skipNextPageView.current = false
      return
    }
    trackMetaEvent("PageView")
  }, [pathname, hydrated, marketingConsent])

  useEffect(() => {
    if (!hydrated || !marketingConsent || !isMetaPixelEnabled()) return
    flushPendingMetaLead()
  }, [hydrated, marketingConsent, pathname])

  if (!isMetaPixelEnabled() || !hydrated || !marketingConsent) return null

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        onLoad={() => flushPendingMetaLead()}
      >
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
