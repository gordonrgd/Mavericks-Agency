"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
  onStepClick?: (stepIndex: number) => void
}

export function Stepper({ steps, currentStep, className, onStepClick }: StepperProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isUpcoming = index > currentStep

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onStepClick?.(index)}
                  disabled={!onStepClick}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                    {
                      "bg-primary border-primary text-primary-foreground": isCompleted,
                      "bg-background border-primary text-primary": isCurrent,
                      "bg-muted border-muted-foreground text-muted-foreground": isUpcoming,
                      "cursor-pointer hover:scale-105": onStepClick && (isCompleted || isCurrent),
                      "cursor-not-allowed": !onStepClick || isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </button>
                
                <div className="mt-2 text-center">
                  <p className={cn(
                    "text-sm font-medium",
                    {
                      "text-foreground": isCurrent || isCompleted,
                      "text-muted-foreground": isUpcoming,
                    }
                  )}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className={cn(
                      "text-xs",
                      {
                        "text-muted-foreground": isCurrent || isCompleted,
                        "text-muted-foreground/60": isUpcoming,
                      }
                    )}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-16 h-0.5 mx-4 transition-colors duration-200",
                  {
                    "bg-primary": isCompleted,
                    "bg-muted": !isCompleted,
                  }
                )} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

