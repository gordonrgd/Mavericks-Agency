"use client"

import { Breadcrumb } from "./breadcrumb"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumb?: boolean
  className?: string
}

export function PageHeader({ title, description, breadcrumb = true, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {breadcrumb && <Breadcrumb />}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <Separator />
    </div>
  )
}

