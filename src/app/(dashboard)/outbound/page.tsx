"use client"

import { useState } from "react"
import Link from "next/link"
import { PhoneOutgoing, Zap, MessageSquare, TrendingUp, Users, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { formatCurrency, formatPercent } from "@/lib/formatters"
import campaignsData from "@/data/campaigns.json"
import smsThreadsData from "@/data/sms-threads.json"

const campaigns = campaignsData as any[]
const smsThreads = smsThreadsData as any[]

export default function OutboundPage() {
  return (
    <div>
      <PageHeader title="Outbound Campaigns" description="Manage outbound calls, speed-to-lead, and SMS campaigns" />

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="speed-to-lead">Speed-to-Lead</TabsTrigger>
          <TabsTrigger value="sms">SMS Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
            <StatCard title="Active Campaigns" value={campaigns.filter((c: any) => c.status === "active").length} icon={PhoneOutgoing} />
            <StatCard title="Total Contacts" value={campaigns.reduce((sum: number, c: any) => sum + (c.metrics?.totalContacts || c.contacts?.length || 0), 0)} icon={Users} />
            <StatCard title="Avg Response Rate" value={`${(campaigns.reduce((sum: number, c: any) => sum + (c.metrics?.responseRate || 0), 0) / campaigns.length).toFixed(1)}%`} icon={TrendingUp} />
            <StatCard title="Total Revenue" value={formatCurrency(campaigns.reduce((sum: number, c: any) => sum + (c.metrics?.revenue || 0), 0))} icon={CheckCircle} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {campaigns.map((campaign: any) => (
              <Link key={campaign.id} href={`/outbound/${campaign.id}`}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{campaign.name}</CardTitle>
                      <Badge variant={campaign.status === "active" ? "default" : "secondary"}>{campaign.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{campaign.type?.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{campaign.metrics?.contacted || 0} / {campaign.metrics?.totalContacts || campaign.contacts?.length || 0}</span>
                      </div>
                      <Progress value={((campaign.metrics?.contacted || 0) / (campaign.metrics?.totalContacts || campaign.contacts?.length || 1)) * 100} className="h-2" />
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <div className="text-center">
                          <p className="text-lg font-bold">{campaign.metrics?.booked || 0}</p>
                          <p className="text-[10px] text-muted-foreground">Booked</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold">{formatPercent(campaign.metrics?.bookingRate || 0)}</p>
                          <p className="text-[10px] text-muted-foreground">Booking Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold">{formatCurrency(campaign.metrics?.revenue || 0)}</p>
                          <p className="text-[10px] text-muted-foreground">Revenue</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="speed-to-lead" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="Avg Response Time" value="1.4s" trend={-15.4} trendLabel="vs last week" icon={Zap} />
            <StatCard title="Leads Today" value="8" trend={12.5} trendLabel="vs last week" icon={Users} />
            <StatCard title="Contact Rate" value="92%" trend={5.2} trendLabel="vs last week" icon={CheckCircle} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Speed-to-Lead by Source</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { source: "Google LSA", avgTime: "0.8s", leads: 45, contacted: 43, rate: "95.6%" },
                  { source: "Angi", avgTime: "1.2s", leads: 32, contacted: 30, rate: "93.8%" },
                  { source: "Thumbtack", avgTime: "1.5s", leads: 28, contacted: 25, rate: "89.3%" },
                  { source: "Yelp", avgTime: "1.8s", leads: 15, contacted: 13, rate: "86.7%" },
                  { source: "Meta Ads", avgTime: "2.1s", leads: 22, contacted: 19, rate: "86.4%" },
                  { source: "Website", avgTime: "1.1s", leads: 18, contacted: 17, rate: "94.4%" },
                ].map((item) => (
                  <div key={item.source} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">{item.source}</p>
                      <p className="text-xs text-muted-foreground">{item.leads} leads this month</p>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <p className="font-bold text-primary">{item.avgTime}</p>
                        <p className="text-[10px] text-muted-foreground">Avg Response</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{item.rate}</p>
                        <p className="text-[10px] text-muted-foreground">Contact Rate</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          <div className="grid gap-3">
            {smsThreads.map((thread: any) => (
              <Link key={thread.id} href={`/outbound/sms/${thread.id}`}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                          {(thread.customerName as string).split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{thread.customerName}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {(thread.messages as any[])[(thread.messages as any[]).length - 1]?.content}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {thread.unread && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                        <Badge variant="outline" className="text-[10px]">{thread.status}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
