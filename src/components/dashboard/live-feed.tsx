"use client"

import { useEffect, useRef, useState } from "react"
import {
  Phone,
  PhoneOff,
  CalendarCheck,
  AlertTriangle,
  MessageSquare,
  UserPlus,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type LiveFeedType =
  | "call-started"
  | "call-ended"
  | "appointment-booked"
  | "emergency-detected"
  | "sms-received"
  | "lead-captured"

export interface LiveFeedItem {
  id: string
  type: LiveFeedType
  title: string
  description: string
  timestamp: string
  urgent: boolean
}

const FEED_TYPE_CONFIG: Record<
  LiveFeedType,
  { icon: typeof Phone; color: string }
> = {
  "call-started": { icon: Phone, color: "text-blue-500" },
  "call-ended": { icon: PhoneOff, color: "text-green-500" },
  "appointment-booked": { icon: CalendarCheck, color: "text-purple-500" },
  "emergency-detected": { icon: AlertTriangle, color: "text-red-500" },
  "sms-received": { icon: MessageSquare, color: "text-yellow-500" },
  "lead-captured": { icon: UserPlus, color: "text-green-500" },
}

const RELATIVE_OFFSETS = [0, 4, 7, 12, 18, 25]

function getRelativeTime(position: number): string {
  if (position === 0) return "just now"
  const seconds = RELATIVE_OFFSETS[position] ?? position * 5
  return seconds < 60 ? `${seconds}s ago` : `${Math.floor(seconds / 60)}m ago`
}

interface DisplayItem extends LiveFeedItem {
  displayKey: string
}

export function LiveFeed({ items }: { items: LiveFeedItem[] }) {
  const [visibleItems, setVisibleItems] = useState<DisplayItem[]>([])
  const indexRef = useRef(0)
  const loopRef = useRef(0)

  useEffect(() => {
    if (items.length === 0) return

    // Add first item immediately
    const first = items[0]
    setVisibleItems([{ ...first, displayKey: `${first.id}-0` }])
    indexRef.current = 1

    const interval = setInterval(() => {
      const idx = indexRef.current % items.length
      if (idx === 0) loopRef.current++
      const item = items[idx]
      const displayKey = `${item.id}-${loopRef.current}`

      setVisibleItems((prev) => {
        const next = [{ ...item, displayKey }, ...prev]
        return next.slice(0, 6)
      })

      indexRef.current++
    }, 3500)

    return () => clearInterval(interval)
  }, [items])

  return (
    <Card className="h-full flex flex-col card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse-dot" />
          </span>
          Live Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="space-y-2">
          {visibleItems.map((item, i) => {
            const config = FEED_TYPE_CONFIG[item.type]
            const Icon = config.icon
            const isUrgent = item.urgent

            return (
              <div
                key={item.displayKey}
                className={`flex items-start gap-3 p-3 rounded-lg border text-sm animate-slide-in-right ${
                  isUrgent
                    ? "border-l-2 border-l-red-500 border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20 dark:border-l-red-500"
                    : "bg-muted/30"
                }`}
              >
                <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${config.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-xs leading-tight">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">
                  {getRelativeTime(i)}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
