"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatItem {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
}

interface StatsProps {
  items: StatItem[]
  className?: string
  columns?: 2 | 3 | 4
}

export function Stats({ items, className, columns = 3 }: StatsProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {items.map((item, index) => (
        <Card key={index} className="border-0 shadow-none bg-muted/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            {item.icon && (
              <item.icon className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            {item.description && (
              <CardDescription className="text-xs">
                {item.description}
              </CardDescription>
            )}
            {item.trend && (
              <div className={cn(
                "flex items-center text-xs mt-1",
                {
                  "text-green-600": item.trend.isPositive,
                  "text-red-600": !item.trend.isPositive,
                }
              )}>
                <span className={cn(
                  "mr-1",
                  {
                    "rotate-0": item.trend.isPositive,
                    "rotate-180": !item.trend.isPositive,
                  }
                )}>
                  ▲
                </span>
                {item.trend.value}%
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  className?: string
}

export function StatCard({ title, value, description, icon: Icon, className }: StatCardProps) {
  return (
    <Card className={cn("border-0 shadow-none bg-muted/20", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <CardDescription className="text-xs">
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  )
}

