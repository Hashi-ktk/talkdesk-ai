"use client"

import { Shield, CalendarCheck, Zap, Clock, Moon, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { formatCurrency, formatPercent } from "@/lib/formatters"
import analyticsData from "@/data/analytics.json"
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar
} from "recharts"

const analytics = analyticsData as any

export default function AnalyticsPage() {
  const dailyMetrics = (analytics.dailyMetrics || []) as any[]
  const csrScores = (analytics.csrScores || []) as any[]
  const campaignROI = (analytics.campaignROI || []) as any[]

  const afterHoursData = dailyMetrics.slice(-14).map((d: any) => ({
    date: d.date,
    afterHours: d.afterHours,
    regular: d.totalCalls - d.afterHours,
  }))

  return (
    <div>
      <PageHeader title="Analytics & Reports" description="Detailed performance metrics and AI agent insights" />

      {/* Top KPIs */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6">
        <StatCard title="Containment Rate" value={formatPercent(analytics.containmentRate)} icon={Shield} />
        <StatCard title="Booking Rate" value={formatPercent(analytics.bookingRate)} icon={CalendarCheck} />
        <StatCard title="Avg Response" value={`${analytics.avgResponseTime}s`} icon={Zap} />
        <StatCard title="Emergency Speed" value={`${analytics.emergencySpeed}s`} icon={Clock} />
        <StatCard title="After-Hours Rate" value={formatPercent(analytics.afterHoursRate)} icon={Moon} />
        <StatCard title="Campaign Revenue" value={formatCurrency(campaignROI.reduce((s: number, c: any) => s + c.revenue, 0))} icon={DollarSign} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* After-Hours Breakdown */}
        <Card>
          <CardHeader><CardTitle className="text-base">After-Hours vs Regular Calls (14 days)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={afterHoursData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tickFormatter={(v: string) => new Date(v).toLocaleDateString("en-US", { day: "numeric" })} tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="regular" name="Regular Hours" stackId="a" fill="hsl(220, 70%, 50%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="afterHours" name="After Hours" stackId="a" fill="hsl(260, 60%, 55%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Campaign ROI */}
        <Card>
          <CardHeader><CardTitle className="text-base">Campaign ROI</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignROI.map((campaign: any, idx: number) => (
                <div key={idx} className="p-3 rounded-lg border bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{campaign.name}</p>
                    <Badge variant="outline" className="text-green-600 border-green-300">
                      {campaign.roi}% ROI
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Spend</p>
                      <p className="font-medium">{formatCurrency(campaign.spend)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-medium text-green-600">{formatCurrency(campaign.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Leads</p>
                      <p className="font-medium">{campaign.leads}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conversions</p>
                      <p className="font-medium">{campaign.conversions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CSR Coaching Scores */}
      <Card>
        <CardHeader><CardTitle className="text-base">CSR Performance Scores</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {csrScores.map((csr: any, idx: number) => (
              <div key={idx} className="p-4 rounded-lg border bg-muted/20 text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-muted stroke-current"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`stroke-current ${csr.score >= 90 ? "text-green-500" : csr.score >= 80 ? "text-blue-500" : csr.score >= 70 ? "text-yellow-500" : "text-red-500"}`}
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={`${csr.score}, 100`}
                      d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">{csr.score}</span>
                </div>
                <p className="font-medium text-sm">{csr.name}</p>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Calls</p>
                    <p className="font-medium">{csr.callsHandled}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Booking</p>
                    <p className="font-medium">{csr.bookingRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Duration</p>
                    <p className="font-medium">{Math.floor(csr.avgDuration / 60)}m {csr.avgDuration % 60}s</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CSAT</p>
                    <p className="font-medium">{csr.customerSatisfaction}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
