"use client"

import { Globe, MessageSquare, Phone, ArrowRightLeft, Clock, TrendingUp, Send, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/shared/page-header"
import { formatDuration } from "@/lib/formatters"
import webchatData from "@/data/webchat.json"

const data = webchatData as any

export default function WebChatPage() {
  return (
    <div>
      <PageHeader title="Web Chat" description="Website chat widget analytics and configuration" />

      {/* KPI Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Chats</p>
                <p className="text-2xl font-bold">{data.stats.totalChats}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Booking Rate</p>
                <p className="text-2xl font-bold">{(data.stats.bookingRate * 100).toFixed(0)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Chat → Call Rate</p>
                <p className="text-2xl font-bold">{(data.stats.chatToCallRate * 100).toFixed(0)}%</p>
              </div>
              <ArrowRightLeft className="h-8 w-8 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">{data.stats.avgResponseTime}</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat Widget Preview */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Chat Widget Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg max-w-sm mx-auto overflow-hidden">
                <div className="bg-primary text-primary-foreground p-3 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">AT</div>
                  <div>
                    <p className="text-sm font-medium">All-Temp Assistant</p>
                    <p className="text-[10px] opacity-80">Online now</p>
                  </div>
                </div>
                <div className="p-3 space-y-3 bg-muted/20 min-h-[200px]">
                  <div className="flex gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">AI</div>
                    <div className="bg-primary/10 rounded-lg p-2 text-sm max-w-[85%]">
                      {data.config.greeting}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-row-reverse">
                    <div className="bg-muted rounded-lg p-2 text-sm max-w-[85%]">
                      Hi, my furnace isn&apos;t working. Can someone come look at it?
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">AI</div>
                    <div className="bg-primary/10 rounded-lg p-2 text-sm max-w-[85%]">
                      I&apos;m sorry to hear that! I can help schedule a service visit. For faster assistance, would you like me to connect you with our team by phone?
                    </div>
                  </div>
                </div>
                <div className="p-2 border-t flex gap-2">
                  <Input placeholder="Type a message..." className="text-sm h-8" disabled />
                  <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <Send className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(data.conversations as any[]).map((conv: any) => (
                  <div key={conv.id} className="flex items-start justify-between p-3 rounded-lg border bg-muted/20">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm truncate">{conv.customerName}</p>
                        <Badge
                          variant={conv.status === "completed" ? "default" : conv.status === "re-engaged" ? "outline" : "secondary"}
                          className="text-[10px] shrink-0"
                        >
                          {conv.status}
                        </Badge>
                        {conv.convertedToCall && (
                          <Badge variant="outline" className="text-[10px] gap-1 shrink-0 border-green-500 text-green-600">
                            <Phone className="h-2.5 w-2.5" />
                            Called
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{conv.topic}</p>
                      <p className="text-xs text-muted-foreground mt-1">{conv.outcome}</p>
                    </div>
                    <div className="text-right text-xs text-muted-foreground shrink-0 ml-3">
                      <p>{conv.messages} msgs</p>
                      <p>{formatDuration(conv.duration)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Phone-First Mode</Label>
                  <p className="text-xs text-muted-foreground">Encourage callers to call for faster service</p>
                </div>
                <Switch defaultChecked={data.config.phoneFirstEnabled} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">SMS Re-engagement</Label>
                  <p className="text-xs text-muted-foreground">Auto-send SMS to dropped chats</p>
                </div>
                <Switch defaultChecked={data.config.smsReEngagement} />
              </div>
              <Separator />
              <div>
                <Label className="text-sm font-medium">Re-engagement Delay</Label>
                <p className="text-xs text-muted-foreground mb-2">Minutes after chat drops before SMS is sent</p>
                <Input defaultValue={data.config.smsReEngagementDelay} type="number" className="w-24" />
              </div>
              <Separator />
              <div>
                <Label className="text-sm font-medium">Operating Hours</Label>
                <p className="text-xs text-muted-foreground mt-1">{data.config.operatingHours}</p>
              </div>
              <Separator />
              <div>
                <Label className="text-sm font-medium">Max Wait Time</Label>
                <p className="text-xs text-muted-foreground mt-1">{data.config.maxWaitTime} seconds before offer to call</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Chat Stats Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-medium text-green-600">{data.stats.completedChats}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dropped</span>
                <span className="font-medium text-red-500">{data.stats.droppedChats}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Re-engaged</span>
                <span className="font-medium text-blue-500">{data.stats.reEngagedChats}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
