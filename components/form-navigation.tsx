"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface FormNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  isStepValid: boolean
  isLoading: boolean
  previousText: string
  nextText: string
  submitText: string
  submittingText: string
}

export default function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isStepValid,
  isLoading,
  previousText,
  nextText,
  submitText,
  submittingText,
}: FormNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 pb-2 border-t border-border scroll-mt-24">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="w-full sm:w-auto h-12 px-6"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        {previousText}
      </Button>

      {currentStep < totalSteps ? (
        <Button
          type="button"
          onClick={onNext}
          disabled={!isStepValid}
          className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-200"
        >
          {nextText}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={isLoading || !isStepValid}
          className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200"
        >
          {isLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          )}
          {isLoading ? submittingText : submitText}
        </Button>
      )}
    </div>
  )
}
