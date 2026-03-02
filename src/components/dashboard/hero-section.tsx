"use client"

import { useEffect, useRef, useState } from "react"
import { Phone, Target, CalendarCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface HeroSectionProps {
  totalCalls: number
  leadsPercentage: number
  bookedPercentage: number
}

function useCountUp(target: number, duration = 1200, delay = 0) {
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

const kpis = [
  {
    key: "calls",
    icon: Phone,
    label: "Total Calls",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
    suffix: "",
  },
  {
    key: "leads",
    icon: Target,
    label: "Leads",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "bg-gradient-to-br from-green-100 to-emerald-50 dark:from-green-900/40 dark:to-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
    suffix: "%",
  },
  {
    key: "booked",
    icon: CalendarCheck,
    label: "Booked",
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "bg-gradient-to-br from-purple-100 to-violet-50 dark:from-purple-900/40 dark:to-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
    suffix: "%",
  },
] as const

export function HeroSection({ totalCalls, leadsPercentage, bookedPercentage }: HeroSectionProps) {
  const animatedCalls = useCountUp(totalCalls, 1400, 200)
  const animatedLeads = useCountUp(leadsPercentage, 1200, 400)
  const animatedBooked = useCountUp(bookedPercentage, 1200, 600)
  const animated = [animatedCalls, animatedLeads, animatedBooked]

  return (
    <div className="mb-6">
      <h1 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4 animate-fade-up">
        Coach Dashboard
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <Card
              key={kpi.key}
              className="card-hover animate-fade-up overflow-hidden"
              style={{ animationDelay: `${i * 100 + 100}ms` }}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${kpi.bgGradient} transition-transform duration-200 group-hover:scale-110`}>
                  <Icon className={`h-5 w-5 ${kpi.textColor}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums">
                    {kpi.key === "calls" ? animated[i].toLocaleString() : animated[i]}
                    {kpi.suffix}
                  </p>
                  <p className="text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
