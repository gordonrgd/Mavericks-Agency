"use client"

import React from "react"
import { CheckCircle } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressStepperProps {
  currentStep: number
  totalSteps: number
  stepTitles: string[]
  stepIcons: React.ComponentType<React.SVGProps<SVGSVGElement>>[]
}

export default function ProgressStepper({
  currentStep,
  totalSteps,
  stepTitles,
  stepIcons,
}: ProgressStepperProps) {
  const progressValue = (currentStep / totalSteps) * 100

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardContent className="p-4 md:p-6">
        {/* Étapes avec icônes */}
        <div className="relative mb-5 md:mb-6">
          <div className="flex items-center justify-between gap-1.5 md:gap-2">
            {stepTitles.map((title, index) => {
              const StepIcon = stepIcons[index]
              const stepNumber = index + 1
              const isActive = stepNumber === currentStep
              const isCompleted = stepNumber < currentStep

              return (
                <div key={index} className="flex flex-col items-center relative z-10 flex-1 min-w-0">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-1.5 md:mb-3 transition-all duration-300 flex-shrink-0 ${
                      isCompleted
                        ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                        : isActive
                          ? "bg-gray-900 text-white shadow-lg shadow-gray-900/30"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 md:h-6 md:w-6" />
                    ) : (
                      <StepIcon className="h-5 w-5 md:h-6 md:w-6" />
                    )}
                  </div>
                  <span
                    className={`hidden md:block text-[10px] lg:text-xs leading-tight text-center font-medium transition-colors duration-200 w-full px-1 break-words min-h-[2.2rem] ${
                      isActive || isCompleted ? "text-gray-900 font-semibold" : "text-gray-500"
                    }`}
                  >
                    {title}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Ligne de connexion */}
          <div className="absolute top-[18px] sm:top-5 md:top-7 left-0 right-0 h-0.5 bg-gray-200 hidden md:block">
            <div
              className="h-full bg-gray-900 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Barre de progression */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-medium text-foreground">
              Étape {currentStep} sur {totalSteps}
            </span>
            <span className="text-muted-foreground">
              {Math.round(progressValue)}% terminé
            </span>
          </div>
          <Progress value={progressValue} className="h-3" />
        </div>
      </CardContent>
    </Card>
  )
}
