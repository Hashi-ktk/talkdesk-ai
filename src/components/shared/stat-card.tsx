"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  trend?: number
  trendLabel?: string
  icon?: LucideIcon
  className?: string
  format?: "number" | "percent" | "time" | "currency"
}

export function StatCard({
  title,
  value,
  trend,
  trendLabel,
  icon: Icon,
  className,
}: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0
  const isResponseTime = title.toLowerCase().includes("response")

  // For response time, negative trend is good (faster)
  const trendIsGood = isResponseTime ? !isPositive : isPositive

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold animate-counter-up">{value}</div>
        {trend !== undefined && (
          <div className="flex items-center gap-1 mt-1">
            {trendIsGood ? (
              <ArrowUpRight className="h-3 w-3 text-green-600" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-600" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                trendIsGood ? "text-green-600" : "text-red-600"
              )}
            >
              {trend >= 0 ? "+" : ""}{trend.toFixed(1)}%
            </span>
            {trendLabel && (
              <span className="text-xs text-muted-foreground">{trendLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
