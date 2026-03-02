"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Users, TrendingUp, DollarSign, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { formatCurrency, formatPhone } from "@/lib/formatters"
import campaignsData from "@/data/campaigns.json"

export default function CampaignDetailPage({ params }: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = use(params)
  const campaign = (campaignsData as any[]).find((c) => c.id === campaignId)

  if (!campaign) return <div className="p-8 text-center text-muted-foreground">Campaign not found</div>

  const contacts = (campaign.contacts || []) as any[]
  const metrics = campaign.metrics || {}

  return (
    <div>
      <PageHeader
        title={campaign.name}
        description={campaign.description || `${campaign.type?.replace(/-/g, " ")} campaign`}
        actions={
          <Link href="/outbound"><Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button></Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard title="Total Contacts" value={metrics.totalContacts || contacts.length} icon={Users} />
        <StatCard title="Contacted" value={metrics.contacted || 0} icon={Phone} />
        <StatCard title="Booked" value={metrics.booked || 0} icon={TrendingUp} />
        <StatCard title="Revenue" value={formatCurrency(metrics.revenue || 0)} icon={DollarSign} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Campaign Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Contact Rate</span>
                <span className="font-medium">{((metrics.contacted || 0) / (metrics.totalContacts || contacts.length || 1) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(metrics.contacted || 0) / (metrics.totalContacts || contacts.length || 1) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Response Rate</span>
                <span className="font-medium">{metrics.responseRate || 0}%</span>
              </div>
              <Progress value={metrics.responseRate || 0} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Booking Rate</span>
                <span className="font-medium">{metrics.bookingRate || 0}%</span>
              </div>
              <Progress value={metrics.bookingRate || 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Campaign Info</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Type</span><Badge variant="outline">{campaign.type}</Badge></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge variant={campaign.status === "active" ? "default" : "secondary"}>{campaign.status}</Badge></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Start Date</span><span>{campaign.startDate}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">End Date</span><span>{campaign.endDate}</span></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Contacts ({contacts.length})</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead>Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.slice(0, 20).map((contact: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-sm">{contact.name}</TableCell>
                  <TableCell className="text-sm">{formatPhone(contact.phone)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">{contact.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{contact.attempts}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{contact.outcome || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
