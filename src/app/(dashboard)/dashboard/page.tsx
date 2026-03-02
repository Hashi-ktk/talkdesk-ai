"use client"

import { HeroSection } from "@/components/dashboard/hero-section"
import { TimeFilterBar } from "@/components/dashboard/time-filter-bar"
import { ScoreAreaChart } from "@/components/dashboard/score-area-chart"
import { UnbookedReasonsPanel } from "@/components/dashboard/unbooked-reasons-panel"
import { RecentCallsTable } from "@/components/dashboard/recent-calls-table"
import { MissedBookingRecovery } from "@/components/dashboard/missed-booking-recovery"
import { LiveFeed } from "@/components/dashboard/live-feed"
import { AnimateIn } from "@/components/ui/animate-in"
import coachData from "@/data/coach-dashboard.json"
import dashboardMetricsData from "@/data/dashboard-metrics.json"

export default function DashboardPage() {
  return (
    <div>
      <HeroSection
        totalCalls={coachData.kpis.totalCalls}
        leadsPercentage={coachData.kpis.leadsPercentage}
        bookedPercentage={coachData.kpis.bookedPercentage}
      />

      <TimeFilterBar />

      <AnimateIn delay={300} className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2">
          <ScoreAreaChart data={coachData.monthlyScores} />
        </div>
        <div>
          <UnbookedReasonsPanel
            totalCalls={coachData.unbookedReasons.totalCalls}
            reasons={coachData.unbookedReasons.reasons}
          />
        </div>
      </AnimateIn>

      <AnimateIn delay={500} className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2">
          <MissedBookingRecovery />
        </div>
        <div>
          <LiveFeed items={dashboardMetricsData.liveFeed as any} />
        </div>
      </AnimateIn>

      <AnimateIn delay={700}>
        <RecentCallsTable calls={coachData.recentCalls} />
      </AnimateIn>
    </div>
  )
}
