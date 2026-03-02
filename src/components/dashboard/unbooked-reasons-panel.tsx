"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Reason {
  label: string
  count: number
  percentage: number
  color: string
}

interface UnbookedReasonsPanelProps {
  totalCalls: number
  reasons: Reason[]
}

function useCountUp(target: number, duration = 1000, delay = 0) {
  const [value, setValue] = useState(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now()
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step)
        }
      }
      frameRef.current = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [target, duration, delay])

  return value
}

export function UnbookedReasonsPanel({ totalCalls, reasons }: UnbookedReasonsPanelProps) {
  const [barVisible, setBarVisible] = useState(false)
  const animatedTotal = useCountUp(totalCalls, 1200, 300)

  useEffect(() => {
    const timer = setTimeout(() => setBarVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="h-full card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Unbooked Reasons</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-4xl font-bold tabular-nums">{animatedTotal}</p>
          <p className="text-xs text-muted-foreground">Unbooked calls</p>
        </div>

        {/* Stacked horizontal bar — animated */}
        <div className="flex h-3 w-full overflow-hidden rounded-full mb-5">
          {reasons.map((reason, i) => (
            <div
              key={reason.label}
              className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-1000 ease-out"
              style={{
                width: barVisible ? `${reason.percentage}%` : "0%",
                backgroundColor: reason.color,
                transitionDelay: `${i * 100 + 200}ms`,
              }}
            />
          ))}
        </div>

        {/* Breakdown list — staggered */}
        <div className="space-y-3">
          {reasons.map((reason, i) => (
            <div
              key={reason.label}
              className="flex items-center justify-between text-sm animate-fade-in-row"
              style={{ animationDelay: `${i * 80 + 600}ms` }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: reason.color }}
                />
                <span>{reason.label}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-xs">{reason.count} calls</span>
                <span className="text-xs font-medium text-foreground w-8 text-right">
                  {reason.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
