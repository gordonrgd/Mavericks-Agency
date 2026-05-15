"use client"

import type React from "react"
import { useRef, useState } from "react"
import type { TurnstileInstance } from "@marsidev/react-turnstile"
import { toast } from "sonner"
import AnimatedSection from "@/components/animated-section"
import { Mail, Clock, Send } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import TurnstileWidget, { isTurnstileWidgetConfigured } from "@/components/turnstile-widget"

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [turnstileToken, setTurnstileToken] = useState("")
  const turnstileRef = useRef<TurnstileInstance | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isTurnstileWidgetConfigured && !turnstileToken.trim()) {
      toast.error(t("common.turnstileRequired"))
      return
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken: turnstileToken || undefined }),
      })
      if (res.ok) {
        setFormData({ name: '', email: '', message: '' })
        setTurnstileToken("")
        turnstileRef.current?.reset()
        toast.success(t("contact.form.success"))
      } else {
        let msg = t("contact.form.error")
        try {
          const errBody = (await res.json()) as { error?: string }
          if (typeof errBody.error === "string" && errBody.error.length > 0) {
            msg = errBody.error
          }
        } catch {
          /* keep default */
        }
        turnstileRef.current?.reset()
        setTurnstileToken("")
        toast.error(msg)
      }
    } catch {
      turnstileRef.current?.reset()
      setTurnstileToken("")
      toast.error(t("contact.form.error"))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 md:mb-6">{t("contact.title")}</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          {/* Contact Form */}
          <AnimatedSection>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("contact.form.title")}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.name")}
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t("contact.form.name")}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.email")}
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.message")}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder={t("contact.form.messagePlaceholder")}
                  />
                </div>

                <TurnstileWidget
                  ref={turnstileRef}
                  action="contact"
                  onSuccess={setTurnstileToken}
                  onExpire={() => setTurnstileToken("")}
                />

                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  {t("contact.form.submit")}
                </Button>
                <p className="text-xs text-gray-500 text-center">{t("contact.form.reassurance")}</p>
              </form>
            </div>
          </AnimatedSection>

          {/* Contact Information */}
          <AnimatedSection delay={0.2}>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{t("contact.info.title")}</h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="text-gray-600 h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t("contact.info.email")}</h3>
                    <a
                      href={`mailto:${t("contact.info.emailAddress")}`}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {t("contact.info.emailAddress")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <Clock className="text-gray-600 h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t("contact.info.hours.title")}</h3>
                    <p className="text-gray-600">
                      {t("contact.info.hours.schedule")}
                      <br />
                      {t("contact.info.hours.emergency")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{t("contact.info.response.title")}</h3>
                <p className="text-gray-600">
                  {t("contact.info.response.description")}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}