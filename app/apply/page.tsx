"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { TurnstileInstance } from "@marsidev/react-turnstile"
import {
  ArrowLeft,
  CheckCircle,
  User,
  Briefcase,
  Target,
  HelpCircle,
  Camera,
  MessageSquare,
} from "lucide-react"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AnimatedSection from "@/components/animated-section"
import ProgressStepper from "@/components/progress-stepper"
import FormNavigation from "@/components/form-navigation"
import TurnstileWidget, { isTurnstileWidgetConfigured } from "@/components/turnstile-widget"

export default function ApplyPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")
  const turnstileRef = useRef<TurnstileInstance | null>(null)
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    location: "",
    timezone: "",

    // Step 2: OnlyFans Information
    onlyFansUsername: "",
    currentMonthlyRevenue: "",
    accountAge: "",
    subscriberCount: "",
    averageSubscriptionPrice: "",
    contentFrequency: "",

    // Step 3: Content & Niche
    contentType: "",
    niche: "",
    contentStyle: "",
    uniqueSellingPoint: "",
    contentCreationExperience: "",
    equipmentQuality: "",

    // Step 4: Social Media & Marketing
    socialMediaFollowing: "",
    instagramFollowers: "",
    tiktokFollowers: "",
    twitterFollowers: "",
    otherPlatforms: "",
    currentMarketingEfforts: "",

    // Step 5: Business & Goals
    businessGoals: "",
    revenueGoals: "",
    timeCommitment: "",
    availability: "",
    previousManagement: "",
    managementExpectations: "",

    // Step 6: Challenges & Support
    currentChallenges: "",
    biggestObstacles: "",
    supportNeeded: "",
    investmentCapacity: "",
    longTermVision: "",

    // Step 7: Final Details
    hearAboutUs: "",
    additionalInfo: "",
    portfolioLinks: "",
    termsAccepted: false,
    privacyAccepted: false,
    marketingConsent: false,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 7

  const stepIcons = [User, Briefcase, Camera, MessageSquare, Target, HelpCircle, CheckCircle]
  const stepTitles = [
    t("apply.stepTitles.personal"),
    t("apply.stepTitles.onlyfans"),
    t("apply.stepTitles.content"),
    t("apply.stepTitles.social"),
    t("apply.stepTitles.business"),
    t("apply.stepTitles.challenges"),
    t("apply.stepTitles.final"),
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isTurnstileWidgetConfigured && !turnstileToken.trim()) {
      toast.error(t("common.turnstileRequired"))
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken: turnstileToken || undefined }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (res.ok) {
        router.push('/application-received')
      } else {
        turnstileRef.current?.reset()
        setTurnstileToken("")
        const detail =
          typeof data.error === "string" && data.error.length > 0
            ? data.error
            : `${t("apply.error.message")} (${res.status})`
        toast.error(detail)
      }
    } catch {
      turnstileRef.current?.reset()
      setTurnstileToken("")
      toast.error(t("apply.error.message"))
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.age &&
          Number.parseInt(formData.age, 10) >= 18 &&
          formData.location
        )
      case 2:
        return (
          formData.onlyFansUsername && formData.currentMonthlyRevenue && formData.accountAge && formData.subscriberCount
        )
      case 3:
        return formData.contentType && formData.niche && formData.uniqueSellingPoint
      case 4:
        return formData.currentMarketingEfforts
      case 5:
        return formData.businessGoals && formData.revenueGoals && formData.timeCommitment
      case 6:
        return formData.currentChallenges && formData.supportNeeded
      case 7:
        return formData.termsAccepted && formData.privacyAccepted
      default:
        return true
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-16 md:pt-20 pb-16 md:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header avec navigation */}
        <div className="mb-5 md:mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            {t("common.backToHome")}
          </Link>
        </div>

        <AnimatedSection>
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 md:mb-4">
              {t("apply.title")}
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
              {t("apply.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        {/* Barre de progression moderne */}
        <ProgressStepper
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepTitles={stepTitles}
          stepIcons={stepIcons}
        />

        {/* Formulaire principal */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <AnimatedSection>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                                         <div>
                       <h2 className="text-2xl font-bold text-foreground">{t("apply.personal.title")}</h2>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        {t("apply.personal.firstName")} *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder={t("apply.personal.firstName")}
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        {t("apply.personal.lastName")} *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder={t("apply.personal.lastName")}
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        {t("apply.personal.email")} *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t("contact.form.emailPlaceholder")}
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        {t("apply.personal.phone")}
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 555 123 4567"
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-sm font-medium">
                        {t("apply.personal.age")} *
                      </Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="18"
                        placeholder="25"
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium">
                        {t("apply.personal.location")} *
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder={t("apply.personal.location")}
                        className="h-12"
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="timezone" className="text-sm font-medium">
                        {t("apply.personal.timezone")}
                      </Label>
                      <Select value={formData.timezone} onValueChange={(value) => handleSelectChange("timezone", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={t("apply.personal.selectTimezone")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8">PST (UTC-8)</SelectItem>
                          <SelectItem value="UTC-5">EST (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                          <SelectItem value="UTC+1">CET (UTC+1)</SelectItem>
                          <SelectItem value="UTC+2">EET (UTC+2)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Step 2: OnlyFans Information */}
              {currentStep === 2 && (
                <AnimatedSection>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                                         <div>
                       <h2 className="text-2xl font-bold text-foreground">{t("apply.onlyfans.title")}</h2>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="onlyFansUsername" className="text-sm font-medium">
                        {t("apply.onlyfans.username")} *
                      </Label>
                      <Input
                        id="onlyFansUsername"
                        name="onlyFansUsername"
                        value={formData.onlyFansUsername}
                        onChange={handleChange}
                        required
                        placeholder={t("apply.onlyfans.usernamePlaceholder")}
                        className="h-12"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("apply.onlyfans.revenue")} *
                        </Label>
                        <Select value={formData.currentMonthlyRevenue} onValueChange={(value) => handleSelectChange("currentMonthlyRevenue", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder={t("apply.onlyfans.revenueRanges.select")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-500">{t("apply.onlyfans.revenueRanges.range1")}</SelectItem>
                            <SelectItem value="500-1500">{t("apply.onlyfans.revenueRanges.range2")}</SelectItem>
                            <SelectItem value="1500-3000">{t("apply.onlyfans.revenueRanges.range3")}</SelectItem>
                            <SelectItem value="3000-5000">{t("apply.onlyfans.revenueRanges.range4")}</SelectItem>
                            <SelectItem value="5000-10000">{t("apply.onlyfans.revenueRanges.range5")}</SelectItem>
                            <SelectItem value="10000-20000">{t("apply.onlyfans.revenueRanges.range6")}</SelectItem>
                            <SelectItem value="20000+">{t("apply.onlyfans.revenueRanges.range7")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("apply.onlyfans.accountAge")} *
                        </Label>
                        <Select value={formData.accountAge} onValueChange={(value) => handleSelectChange("accountAge", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder={t("apply.onlyfans.accountAgeOptions.select")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1month">{t("apply.onlyfans.accountAgeOptions.month1")}</SelectItem>
                            <SelectItem value="1-3months">{t("apply.onlyfans.accountAgeOptions.months3")}</SelectItem>
                            <SelectItem value="3-6months">{t("apply.onlyfans.accountAgeOptions.months6")}</SelectItem>
                            <SelectItem value="6-12months">{t("apply.onlyfans.accountAgeOptions.year1")}</SelectItem>
                            <SelectItem value="1-2years">{t("apply.onlyfans.accountAgeOptions.years2")}</SelectItem>
                            <SelectItem value="2years+">{t("apply.onlyfans.accountAgeOptions.years2plus")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("apply.onlyfans.subscribers")} *
                        </Label>
                        <Select value={formData.subscriberCount} onValueChange={(value) => handleSelectChange("subscriberCount", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder={t("apply.onlyfans.accountAgeOptions.select")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-50">{t("apply.onlyfans.subscriberRanges.range1")}</SelectItem>
                            <SelectItem value="50-200">{t("apply.onlyfans.subscriberRanges.range2")}</SelectItem>
                            <SelectItem value="200-500">{t("apply.onlyfans.subscriberRanges.range3")}</SelectItem>
                            <SelectItem value="500-1000">{t("apply.onlyfans.subscriberRanges.range4")}</SelectItem>
                            <SelectItem value="1000-2500">{t("apply.onlyfans.subscriberRanges.range5")}</SelectItem>
                            <SelectItem value="2500-5000">{t("apply.onlyfans.subscriberRanges.range6")}</SelectItem>
                            <SelectItem value="5000+">{t("apply.onlyfans.subscriberRanges.range7")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("apply.onlyfans.subscriptionPrice")}
                        </Label>
                        <Select value={formData.averageSubscriptionPrice} onValueChange={(value) => handleSelectChange("averageSubscriptionPrice", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder={t("apply.onlyfans.accountAgeOptions.select")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">{t("apply.onlyfans.priceRanges.free")}</SelectItem>
                            <SelectItem value="3-8">{t("apply.onlyfans.priceRanges.range1")}</SelectItem>
                            <SelectItem value="8-15">{t("apply.onlyfans.priceRanges.range2")}</SelectItem>
                            <SelectItem value="15-25">{t("apply.onlyfans.priceRanges.range3")}</SelectItem>
                            <SelectItem value="25-40">{t("apply.onlyfans.priceRanges.range4")}</SelectItem>
                            <SelectItem value="40+">{t("apply.onlyfans.priceRanges.range5")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        {t("apply.onlyfans.contentFrequency")}
                      </Label>
                      <Select value={formData.contentFrequency} onValueChange={(value) => handleSelectChange("contentFrequency", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={t("apply.onlyfans.accountAgeOptions.select")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">{t("apply.onlyfans.frequencyOptions.daily")}</SelectItem>
                          <SelectItem value="few-times-week">{t("apply.onlyfans.frequencyOptions.fewTimesWeek")}</SelectItem>
                          <SelectItem value="weekly">{t("apply.onlyfans.frequencyOptions.weekly")}</SelectItem>
                          <SelectItem value="few-times-month">{t("apply.onlyfans.frequencyOptions.fewTimesMonth")}</SelectItem>
                          <SelectItem value="monthly">{t("apply.onlyfans.frequencyOptions.monthly")}</SelectItem>
                          <SelectItem value="irregular">{t("apply.onlyfans.frequencyOptions.irregular")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Step 3: Content & Niche */}
              {currentStep === 3 && (
                <AnimatedSection>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Camera className="h-6 w-6 text-primary" />
                    </div>
                                         <div>
                       <h2 className="text-2xl font-bold text-foreground">{t("apply.content.title")}</h2>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="contentType" className="text-sm font-medium">
                        {t("apply.content.contentType")} *
                      </Label>
                      <Select value={formData.contentType} onValueChange={(value) => handleSelectChange("contentType", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={t("apply.content.contentTypes.select")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lifestyle">{t("apply.content.contentTypes.lifestyle")}</SelectItem>
                          <SelectItem value="fitness">{t("apply.content.contentTypes.fitness")}</SelectItem>
                          <SelectItem value="lingerie">{t("apply.content.contentTypes.lingerie")}</SelectItem>
                          <SelectItem value="artistic">{t("apply.content.contentTypes.artistic")}</SelectItem>
                          <SelectItem value="fetish">{t("apply.content.contentTypes.fetish")}</SelectItem>
                          <SelectItem value="couple">{t("apply.content.contentTypes.couple")}</SelectItem>
                          <SelectItem value="solo">{t("apply.content.contentTypes.solo")}</SelectItem>
                          <SelectItem value="other">{t("apply.content.contentTypes.other")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="niche" className="text-sm font-medium">
                        {t("apply.content.niche")} *
                      </Label>
                      <Input
                        id="niche"
                        name="niche"
                        value={formData.niche}
                        onChange={handleChange}
                        required
                        placeholder={t("apply.content.nichePlaceholder")}
                        className="h-12"
                        autoComplete="off"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="uniqueSellingPoint" className="text-sm font-medium">
                        {t("apply.content.uniqueSellingPoint")} *
                      </Label>
                      <Textarea
                        id="uniqueSellingPoint"
                        name="uniqueSellingPoint"
                        value={formData.uniqueSellingPoint}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder={t("apply.content.uniqueSellingPointPlaceholder")}
                        className="min-h-[6rem] resize-y"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contentStyle" className="text-sm font-medium">
                        {t("apply.content.contentStyle")}
                      </Label>
                      <Select value={formData.contentStyle} onValueChange={(value) => handleSelectChange("contentStyle", value)}>
                        <SelectTrigger id="contentStyle" className="h-12">
                          <SelectValue placeholder={t("apply.content.contentTypes.select")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">{t("apply.content.styles.professional")}</SelectItem>
                          <SelectItem value="amateur">{t("apply.content.styles.amateur")}</SelectItem>
                          <SelectItem value="artistic">{t("apply.content.styles.artistic")}</SelectItem>
                          <SelectItem value="playful">{t("apply.content.styles.playful")}</SelectItem>
                          <SelectItem value="sensual">{t("apply.content.styles.sensual")}</SelectItem>
                          <SelectItem value="explicit">{t("apply.content.styles.explicit")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contentCreationExperience" className="text-sm font-medium">
                          {t("apply.content.experience")}
                        </Label>
                        <Select value={formData.contentCreationExperience} onValueChange={(value) => handleSelectChange("contentCreationExperience", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder={t("apply.content.contentTypes.select")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">{t("apply.content.experienceLevels.beginner")}</SelectItem>
                            <SelectItem value="intermediate">{t("apply.content.experienceLevels.intermediate")}</SelectItem>
                            <SelectItem value="experienced">{t("apply.content.experienceLevels.experienced")}</SelectItem>
                            <SelectItem value="expert">{t("apply.content.experienceLevels.expert")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="equipmentQuality" className="text-sm font-medium">
                          {t("apply.content.equipment")}
                        </Label>
                        <Select value={formData.equipmentQuality} onValueChange={(value) => handleSelectChange("equipmentQuality", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder={t("apply.content.contentTypes.select")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="smartphone">{t("apply.content.equipmentLevels.smartphone")}</SelectItem>
                            <SelectItem value="basic-camera">{t("apply.content.equipmentLevels.basicCamera")}</SelectItem>
                            <SelectItem value="professional">{t("apply.content.equipmentLevels.professional")}</SelectItem>
                            <SelectItem value="studio">{t("apply.content.equipmentLevels.studio")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Step 4: Social Media & Marketing */}
              {currentStep === 4 && (
                <AnimatedSection>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                                         <div>
                       <h2 className="text-2xl font-bold text-foreground">{t("apply.social.title")}</h2>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="instagramFollowers" className="text-sm font-medium">
                          {t("apply.social.instagramFollowers")}
                        </Label>
                        <Input
                          id="instagramFollowers"
                          name="instagramFollowers"
                          value={formData.instagramFollowers}
                          onChange={handleChange}
                          placeholder={t("apply.social.followersPlaceholder")}
                          className="h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tiktokFollowers" className="text-sm font-medium">
                          {t("apply.social.tiktokFollowers")}
                        </Label>
                        <Input
                          id="tiktokFollowers"
                          name="tiktokFollowers"
                          value={formData.tiktokFollowers}
                          onChange={handleChange}
                          placeholder={t("apply.social.followersPlaceholder")}
                          className="h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="twitterFollowers" className="text-sm font-medium">
                          {t("apply.social.twitterFollowers")}
                        </Label>
                        <Input
                          id="twitterFollowers"
                          name="twitterFollowers"
                          value={formData.twitterFollowers}
                          onChange={handleChange}
                          placeholder={t("apply.social.followersPlaceholder")}
                          className="h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="otherPlatforms" className="text-sm font-medium">
                        {t("apply.social.otherPlatforms")}
                      </Label>
                      <Textarea
                        id="otherPlatforms"
                        name="otherPlatforms"
                        value={formData.otherPlatforms}
                        onChange={handleChange}
                        rows={3}
                        placeholder={t("apply.social.otherPlatformsPlaceholder")}
                        className="h-20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currentMarketingEfforts" className="text-sm font-medium">
                        {t("apply.social.currentMarketing")} *
                      </Label>
                      <Textarea
                        id="currentMarketingEfforts"
                        name="currentMarketingEfforts"
                        value={formData.currentMarketingEfforts}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder={t("apply.social.currentMarketingPlaceholder")}
                        className="h-24"
                      />
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Step 5: Business & Goals */}
              {currentStep === 5 && (
                <AnimatedSection>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                                         <div>
                       <h2 className="text-2xl font-bold text-foreground">{t("apply.business.title")}</h2>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessGoals" className="text-sm font-medium">
                        {t("apply.business.goals")} *
                      </Label>
                      <Textarea
                        id="businessGoals"
                        name="businessGoals"
                        value={formData.businessGoals}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder={t("apply.business.goalsPlaceholder")}
                        className="h-24"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="revenueGoals" className="text-sm font-medium">
                        {t("apply.business.revenueGoals")} *
                      </Label>
                      <Select value={formData.revenueGoals} onValueChange={(value) => handleSelectChange("revenueGoals", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={t("apply.business.revenueGoalRanges.select")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2000-5000">{t("apply.business.revenueGoalRanges.range1")}</SelectItem>
                          <SelectItem value="5000-10000">{t("apply.business.revenueGoalRanges.range2")}</SelectItem>
                          <SelectItem value="10000-20000">{t("apply.business.revenueGoalRanges.range3")}</SelectItem>
                          <SelectItem value="20000-50000">{t("apply.business.revenueGoalRanges.range4")}</SelectItem>
                          <SelectItem value="50000+">{t("apply.business.revenueGoalRanges.range5")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="timeCommitment" className="text-sm font-medium">
                          {t("apply.business.timeCommitment")} *
                        </Label>
                        <Select value={formData.timeCommitment} onValueChange={(value) => handleSelectChange("timeCommitment", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder={t("apply.content.contentTypes.select")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2hours">{t("apply.business.timeOptions.hours12")}</SelectItem>
                            <SelectItem value="2-4hours">{t("apply.business.timeOptions.hours24")}</SelectItem>
                            <SelectItem value="4-6hours">{t("apply.business.timeOptions.hours46")}</SelectItem>
                            <SelectItem value="6-8hours">{t("apply.business.timeOptions.hours68")}</SelectItem>
                            <SelectItem value="8+hours">{t("apply.business.timeOptions.hours8plus")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="availability" className="text-sm font-medium">
                          {t("apply.business.availability")} *
                        </Label>
                        <Select value={formData.availability} onValueChange={(value) => handleSelectChange("availability", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder={t("apply.content.contentTypes.select")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekdays">{t("apply.business.availabilityOptions.weekdays")}</SelectItem>
                            <SelectItem value="weekends">{t("apply.business.availabilityOptions.weekends")}</SelectItem>
                            <SelectItem value="flexible">{t("apply.business.availabilityOptions.flexible")}</SelectItem>
                            <SelectItem value="evenings">{t("apply.business.availabilityOptions.evenings")}</SelectItem>
                            <SelectItem value="custom">{t("apply.business.availabilityOptions.custom")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="previousManagement" className="text-sm font-medium">
                        {t("apply.business.previousManagement")}
                      </Label>
                      <Select value={formData.previousManagement} onValueChange={(value) => handleSelectChange("previousManagement", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={t("apply.content.contentTypes.select")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">{t("apply.business.managementOptions.never")}</SelectItem>
                          <SelectItem value="positive">{t("apply.business.managementOptions.positive")}</SelectItem>
                          <SelectItem value="negative">{t("apply.business.managementOptions.negative")}</SelectItem>
                          <SelectItem value="mixed">{t("apply.business.managementOptions.mixed")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="managementExpectations" className="text-sm font-medium">
                        {t("apply.business.managementExpectations")}
                      </Label>
                      <Textarea
                        id="managementExpectations"
                        name="managementExpectations"
                        value={formData.managementExpectations}
                        onChange={handleChange}
                        rows={4}
                        placeholder={t("apply.business.managementExpectationsPlaceholder")}
                        className="h-24"
                      />
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Step 6: Challenges & Support */}
              {currentStep === 6 && (
                <AnimatedSection>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <HelpCircle className="h-6 w-6 text-primary" />
                    </div>
                                         <div>
                       <h2 className="text-2xl font-bold text-foreground">{t("apply.challenges.title")}</h2>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="currentChallenges" className="text-sm font-medium">
                        {t("apply.challenges.currentChallenges")} *
                      </Label>
                      <Textarea
                        id="currentChallenges"
                        name="currentChallenges"
                        value={formData.currentChallenges}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder={t("apply.challenges.currentChallengesPlaceholder")}
                        className="h-24"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="biggestObstacles" className="text-sm font-medium">
                        {t("apply.challenges.biggestObstacles")}
                      </Label>
                      <Textarea
                        id="biggestObstacles"
                        name="biggestObstacles"
                        value={formData.biggestObstacles}
                        onChange={handleChange}
                        rows={4}
                        placeholder={t("apply.challenges.biggestObstaclesPlaceholder")}
                        className="h-24"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supportNeeded" className="text-sm font-medium">
                        {t("apply.challenges.supportNeeded")} *
                      </Label>
                      <Textarea
                        id="supportNeeded"
                        name="supportNeeded"
                        value={formData.supportNeeded}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder={t("apply.challenges.supportNeededPlaceholder")}
                        className="h-24"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="investmentCapacity" className="text-sm font-medium">
                          {t("apply.challenges.investmentCapacity")}
                        </Label>
                        <Select value={formData.investmentCapacity} onValueChange={(value) => handleSelectChange("investmentCapacity", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder={t("apply.content.contentTypes.select")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">{t("apply.challenges.investmentOptions.low")}</SelectItem>
                            <SelectItem value="medium">{t("apply.challenges.investmentOptions.medium")}</SelectItem>
                            <SelectItem value="high">{t("apply.challenges.investmentOptions.high")}</SelectItem>
                            <SelectItem value="very-high">{t("apply.challenges.investmentOptions.veryHigh")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="longTermVision" className="text-sm font-medium">
                          {t("apply.challenges.longTermVision")}
                        </Label>
                        <Select value={formData.longTermVision} onValueChange={(value) => handleSelectChange("longTermVision", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder={t("apply.content.contentTypes.select")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short-term">{t("apply.challenges.visionOptions.shortTerm")}</SelectItem>
                            <SelectItem value="brand-building">{t("apply.challenges.visionOptions.brandBuilding")}</SelectItem>
                            <SelectItem value="empire">{t("apply.challenges.visionOptions.empire")}</SelectItem>
                            <SelectItem value="exit-strategy">{t("apply.challenges.visionOptions.exitStrategy")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Step 7: Final Details */}
              {currentStep === 7 && (
                <AnimatedSection>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{t("apply.final.title")}</h2>
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                      <CheckCircle className="mx-auto mb-4 text-green-600 h-12 w-12" />
                      <h3 className="text-lg font-semibold text-green-800 mb-2">{t("apply.final.almostDone")}</h3>
                      <p className="text-green-700">{t("apply.final.almostDoneDesc")}</p>
                      <p className="text-sm text-green-800/90 mt-4 max-w-xl mx-auto leading-relaxed">
                        {t("apply.final.almostDoneHint")}
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 shadow-sm p-6 rounded-lg mb-6 text-left">
                      <h4 className="font-semibold text-gray-900 mb-4 text-center md:text-left">
                        {t("apply.final.profileSummary")}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div className="text-left">
                          <p>
                            <strong>{t("apply.final.name")} :</strong> {formData.firstName} {formData.lastName}
                          </p>
                          <p>
                            <strong>{t("apply.final.onlyfans")} :</strong> @{formData.onlyFansUsername}
                          </p>
                          <p>
                            <strong>{t("apply.final.currentRevenue")} :</strong> {formData.currentMonthlyRevenue}
                          </p>
                        </div>
                        <div className="text-left">
                          <p>
                            <strong>{t("apply.final.niche")} :</strong> {formData.niche}
                          </p>
                          <p>
                            <strong>{t("apply.final.goal")} :</strong> {formData.revenueGoals}
                          </p>
                          <p>
                            <strong>{t("apply.final.timeAvailable")} :</strong> {formData.timeCommitment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="hearAboutUs" className="text-sm font-medium">
                        {t("apply.final.hearAboutUs")}
                      </Label>
                      <Select value={formData.hearAboutUs} onValueChange={(value) => handleSelectChange("hearAboutUs", value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder={t("apply.content.contentTypes.select")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social-media">{t("apply.final.hearAboutOptions.socialMedia")}</SelectItem>
                          <SelectItem value="referral">{t("apply.final.hearAboutOptions.referral")}</SelectItem>
                          <SelectItem value="search-engine">{t("apply.final.hearAboutOptions.searchEngine")}</SelectItem>
                          <SelectItem value="advertisement">{t("apply.final.hearAboutOptions.advertisement")}</SelectItem>
                          <SelectItem value="forum">{t("apply.final.hearAboutOptions.forum")}</SelectItem>
                          <SelectItem value="influencer">{t("apply.final.hearAboutOptions.influencer")}</SelectItem>
                          <SelectItem value="other">{t("apply.final.hearAboutOptions.other")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo" className="text-sm font-medium">
                        {t("apply.final.personalMessage")}
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows={4}
                        placeholder={t("apply.final.personalMessagePlaceholder")}
                        className="h-24"
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 mb-3">{t("apply.final.nextSteps")}</h4>
                      <ul className="text-blue-800 text-sm space-y-2">
                        <li>{t("apply.final.step1")}</li>
                        <li>{t("apply.final.step2")}</li>
                        <li>{t("apply.final.step3")}</li>
                        <li>{t("apply.final.step4")}</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg space-y-4">
                      <div className="flex items-start">
                        <Checkbox
                          id="termsAccepted"
                          name="termsAccepted"
                          checked={Boolean(formData.termsAccepted)}
                          onCheckedChange={(checked) => handleCheckboxChange("termsAccepted", Boolean(checked))}
                          required
                          className="mr-3 h-4 w-4"
                        />
                        <Label htmlFor="termsAccepted" className="text-sm text-gray-700">
                          <strong>{t("apply.final.termsAccepted")}</strong> {t("apply.final.termsText")} *
                        </Label>
                      </div>

                      <div className="flex items-start">
                        <Checkbox
                          id="privacyAccepted"
                          name="privacyAccepted"
                          checked={Boolean(formData.privacyAccepted)}
                          onCheckedChange={(checked) => handleCheckboxChange("privacyAccepted", Boolean(checked))}
                          required
                          className="mr-3 h-4 w-4"
                        />
                        <Label htmlFor="privacyAccepted" className="text-sm text-gray-700">
                          <strong>{t("apply.final.privacyAccepted")}</strong> {t("apply.final.privacyText")} *
                        </Label>
                      </div>

                      <div className="flex items-start">
                        <Checkbox
                          id="marketingConsent"
                          name="marketingConsent"
                          checked={Boolean(formData.marketingConsent)}
                          onCheckedChange={(checked) => handleCheckboxChange("marketingConsent", Boolean(checked))}
                          className="mr-3 h-4 w-4"
                        />
                        <Label htmlFor="marketingConsent" className="text-sm text-gray-700">
                          {t("apply.final.marketingConsent")}
                        </Label>
                      </div>
                    </div>

                    <TurnstileWidget
                      ref={turnstileRef}
                      action="apply"
                      onSuccess={setTurnstileToken}
                      onExpire={() => setTurnstileToken("")}
                    />

                    <div className="text-center text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p>
                        <strong>{t("apply.final.important")}</strong> {t("apply.final.importantText")}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Navigation Buttons */}
              <FormNavigation
                currentStep={currentStep}
                totalSteps={totalSteps}
                onPrevious={prevStep}
                onNext={nextStep}
                isStepValid={Boolean(isStepValid())}
                isLoading={isLoading}
                previousText={t("apply.navigation.previous")}
                nextText={t("apply.navigation.next")}
                submitText={t("apply.navigation.submit")}
                submittingText={t("apply.navigation.submitting")}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
