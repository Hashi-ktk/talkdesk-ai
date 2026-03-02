"use client"

import { PhoneForwarded, MessageSquare, TrendingUp, DollarSign, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import reEngagementData from "@/data/re-engagement.json"

const data = reEngagementData as any

function getStatusColor(status: string) {
  switch (status) {
    case "booked": return "bg-green-600 text-white"
    case "pending": return "bg-yellow-500 text-white"
    case "no-response": return "bg-gray-400 text-white"
    default: return ""
  }
}

export function MissedBookingRecovery() {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <PhoneForwarded className="h-4 w-4" />
          Missed Booking Recovery
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats Row */}
        <div className="grid gap-3 sm:grid-cols-4 mb-6">
          <div className="p-3 rounded-lg bg-muted/30 text-center animate-fade-in-row" style={{ animationDelay: "0ms" }}>
            <p className="text-xs text-muted-foreground">Missed Bookings</p>
            <p className="text-xl font-bold">{data.stats.missedBookings}</p>
          </div>
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 text-center animate-fade-in-row" style={{ animationDelay: "80ms" }}>
            <p className="text-xs text-muted-foreground">Recovered</p>
            <p className="text-xl font-bold text-green-600">{data.stats.recovered}</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-center animate-fade-in-row" style={{ animationDelay: "160ms" }}>
            <p className="text-xs text-muted-foreground">Recovery Rate</p>
            <p className="text-xl font-bold text-blue-600">{data.stats.recoveryRate}%</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 text-center animate-fade-in-row" style={{ animationDelay: "240ms" }}>
            <p className="text-xs text-muted-foreground">Revenue Recovered</p>
            <p className="text-xl font-bold">${data.stats.revenueRecovered.toLocaleString()}</p>
          </div>
        </div>

        {/* Recent Attempts */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Recent Recovery Attempts</p>
          {(data.attempts as any[]).slice(0, 6).map((attempt: any, i: number) => (
            <div key={attempt.id} className="flex items-start justify-between p-3 rounded-lg border bg-muted/20 animate-fade-in-row hover:bg-muted/40 transition-colors" style={{ animationDelay: `${i * 70 + 300}ms` }}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-sm truncate">{attempt.customerName}</p>
                  <Badge variant="outline" className="text-[10px] gap-1 shrink-0">
                    {attempt.method === "sms" ? (
                      <><MessageSquare className="h-2.5 w-2.5" />SMS</>
                    ) : (
                      <><PhoneForwarded className="h-2.5 w-2.5" />AI Call</>
                    )}
                  </Badge>
                  <Badge className={`text-[10px] shrink-0 ${getStatusColor(attempt.status)}`}>
                    {attempt.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{attempt.reason}</p>
                {attempt.response && (
                  <p className="text-xs text-green-600 mt-1">{attempt.response}</p>
                )}
              </div>
              {attempt.revenueRecovered > 0 && (
                <div className="text-right shrink-0 ml-3">
                  <p className="text-sm font-medium text-green-600">${attempt.revenueRecovered}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
