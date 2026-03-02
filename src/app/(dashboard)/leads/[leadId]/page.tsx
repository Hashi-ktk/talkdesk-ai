"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, Mail, Calendar, DollarSign, Clock, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { formatCurrency, formatPhone, formatDate } from "@/lib/formatters"
import leadsData from "@/data/leads.json"

export default function LeadDetailPage({ params }: { params: Promise<{ leadId: string }> }) {
  const { leadId } = use(params)
  const lead = (leadsData as any[]).find((l) => l.id === leadId)

  if (!lead) return <div className="p-8 text-center text-muted-foreground">Lead not found</div>

  const interactions = (lead.interactions || []) as any[]

  return (
    <div>
      <PageHeader
        title={lead.name}
        description={`${lead.serviceType} | ${lead.source}`}
        actions={
          <Link href="/leads"><Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button></Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Lead Details</CardTitle></CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" />{formatPhone(lead.phone)}</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" />{lead.email}</div>
                <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-muted-foreground" />Est. Value: {formatCurrency(lead.estimatedValue)}</div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" />Created: {formatDate(lead.createdAt)}</div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <StatusBadge status={lead.status} variant="leadStatus" />
                  <Badge variant="outline">{lead.source}</Badge>
                </div>
                {lead.assignedTo && <p className="text-sm">Assigned to: <span className="font-medium">{lead.assignedTo}</span></p>}
                {lead.notes && <p className="text-sm text-muted-foreground">{lead.notes}</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Interaction Timeline</CardTitle></CardHeader>
            <CardContent>
              {interactions.length > 0 ? (
                <div className="space-y-4">
                  {interactions.map((interaction: any, idx: number) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                          interaction.type === "call" ? "bg-blue-100 text-blue-600" :
                          interaction.type === "sms" ? "bg-green-100 text-green-600" :
                          interaction.type === "email" ? "bg-purple-100 text-purple-600" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {interaction.type === "call" ? <Phone className="h-3.5 w-3.5" /> :
                           interaction.type === "sms" ? <MessageSquare className="h-3.5 w-3.5" /> :
                           interaction.type === "email" ? <Mail className="h-3.5 w-3.5" /> :
                           <Clock className="h-3.5 w-3.5" />}
                        </div>
                        {idx < interactions.length - 1 && <div className="w-px h-full bg-border mt-1" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px]">{interaction.type}</Badge>
                          <span className="text-xs text-muted-foreground">{formatDate(interaction.date)}</span>
                        </div>
                        <p className="text-sm mt-1">{interaction.summary}</p>
                        {interaction.outcome && <p className="text-xs text-muted-foreground mt-1">Outcome: {interaction.outcome}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No interactions recorded yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader><CardTitle className="text-base">Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default"><Phone className="h-4 w-4 mr-2" />Call Lead</Button>
              <Button className="w-full" variant="outline"><MessageSquare className="h-4 w-4 mr-2" />Send SMS</Button>
              <Button className="w-full" variant="outline"><Mail className="h-4 w-4 mr-2" />Send Email</Button>
              <Button className="w-full" variant="outline"><Calendar className="h-4 w-4 mr-2" />Schedule Appointment</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
