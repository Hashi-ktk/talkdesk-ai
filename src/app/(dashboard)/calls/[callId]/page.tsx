"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, Calendar, Clock, AlertTriangle, User, MapPin, Building2, Home, Wrench, PhoneForwarded } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { formatPhone, formatDuration, formatDate } from "@/lib/formatters"
import callsData from "@/data/calls.json"
import transcriptsData from "@/data/transcripts.json"
import customersData from "@/data/customers.json"
import reEngagementData from "@/data/re-engagement.json"

export default function CallDetailPage({ params }: { params: Promise<{ callId: string }> }) {
  const { callId } = use(params)
  const call = (callsData as any[]).find((c) => c.id === callId)
  const transcript = (transcriptsData as any[]).find((t) => t.callId === callId)
  const customer = call?.customerId ? (customersData as any[]).find((c) => c.id === call.customerId) : null
  const reEngagement = (reEngagementData as any).attempts?.find((a: any) => a.callId === callId)

  if (!call) {
    return <div className="p-8 text-center text-muted-foreground">Call not found</div>
  }

  return (
    <div>
      <PageHeader
        title={`Call: ${call.customerName}`}
        description={call.summary}
        actions={
          <Link href="/calls">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Calls
            </Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Call Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Call Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{formatPhone(call.customerPhone)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(call.timestamp)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Duration: {call.duration > 0 ? formatDuration(call.duration) : "N/A"}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={call.type} variant="callType" />
                <StatusBadge status={call.status} />
                <StatusBadge status={call.urgency} variant="urgency" />
                <Badge variant={call.aiHandled ? "default" : "secondary"}>{call.aiHandled ? "AI Handled" : "Human"}</Badge>
                {call.appointmentBooked && <Badge className="bg-green-600 text-white">Appointment Booked</Badge>}
                <Badge variant="outline" className="gap-1">
                  {call.propertyType === "commercial" ? (
                    <><Building2 className="h-3 w-3" />Commercial</>
                  ) : (
                    <><Home className="h-3 w-3" />Residential</>
                  )}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Install Details */}
          {call.installDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Install Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <Badge variant="outline">{call.installDetails.isReplacement ? "Replacement" : "New Installation"}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current System</span>
                      <span className="font-medium text-right max-w-[200px]">{call.installDetails.currentSystem}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Home Size</span>
                      <span className="font-medium">{call.installDetails.homeSizeSqFt.toLocaleString()} sq ft</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Floors</span>
                      <span className="font-medium">{call.installDetails.floors}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Timeline</span>
                      <span className="font-medium">{call.installDetails.timeline}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Financing Interest</span>
                      <Badge variant={call.installDetails.financingInterested ? "default" : "secondary"} className="text-[10px]">
                        {call.installDetails.financingInterested ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                  {call.isHomeowner !== undefined && (
                    <div className="sm:col-span-2 flex justify-between text-sm pt-2 border-t">
                      <span className="text-muted-foreground">Homeowner Verified</span>
                      <Badge variant={call.isHomeowner ? "default" : "destructive"} className="text-[10px]">
                        {call.isHomeowner ? "Yes - Homeowner" : "Not Homeowner"}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transcript */}
          {transcript ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Call Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(transcript.lines as any[]).map((line: any, idx: number) => (
                    <div key={idx} className={`flex gap-3 ${line.speaker === "ai" ? "" : "flex-row-reverse"}`}>
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        line.speaker === "ai" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {line.speaker === "ai" ? "AI" : "C"}
                      </div>
                      <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                        line.speaker === "ai" ? "bg-primary/10" : "bg-muted"
                      }`}>
                        <p>{line.text}</p>
                        {line.tags && line.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(line.tags as string[]).map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-[9px] px-1.5 py-0">{tag}</Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="text-sm">
                  <p className="font-medium mb-1">AI Summary</p>
                  <p className="text-muted-foreground">{transcript.summary}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <Phone className="h-8 w-8 mx-auto mb-3 opacity-50" />
                <p>No transcript available for this call</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Customer Info */}
        <div className="space-y-6">
          {customer ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-muted-foreground">{formatPhone(customer.phone)}</p>
                  <p className="text-muted-foreground">{customer.email}</p>
                </div>
                <Separator />
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p>{typeof customer.address === "string" ? customer.address : `${customer.address.street}, ${customer.address.city}, ${customer.address.state} ${customer.address.zip}`}</p>
                  </div>
                </div>
                {customer.maintenancePlan && (
                  <>
                    <Separator />
                    <div>
                      <p className="font-medium">Maintenance Plan</p>
                      <Badge variant="outline" className="mt-1">{customer.maintenancePlan.type} - {customer.maintenancePlan.status}</Badge>
                    </div>
                  </>
                )}
                <Separator />
                <div>
                  <p className="font-medium mb-1">Equipment</p>
                  {(customer.equipment as any[]).map((eq: any, idx: number) => (
                    <div key={idx} className="text-xs text-muted-foreground mb-1">
                      {eq.brand} {eq.model} ({eq.type}) - {eq.condition}
                    </div>
                  ))}
                </div>
                <Link href={`/customers/${customer.id}`}>
                  <Button variant="outline" size="sm" className="w-full mt-2">View Full Profile</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground text-sm">
                <User className="h-6 w-6 mx-auto mb-2 opacity-50" />
                <p>Unknown caller - no customer record</p>
              </CardContent>
            </Card>
          )}

          {call.urgency === "critical" && (
            <Card className="border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20">
              <CardContent className="py-4">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-bold text-sm">Emergency Flag</span>
                </div>
                <p className="mt-2 text-sm text-red-700 dark:text-red-300">{call.summary}</p>
              </CardContent>
            </Card>
          )}

          {/* Re-engagement Status for unbooked calls */}
          {!call.appointmentBooked && reEngagement && (
            <Card className="border-blue-200 dark:border-blue-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <PhoneForwarded className="h-4 w-4 text-blue-500" />
                  Re-engagement Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method</span>
                  <Badge variant="outline" className="text-[10px]">{reEngagement.method === "sms" ? "SMS" : "AI Call"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge
                    variant={reEngagement.status === "booked" ? "default" : reEngagement.status === "pending" ? "secondary" : "outline"}
                    className="text-[10px]"
                  >
                    {reEngagement.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attempted</span>
                  <span>{reEngagement.attemptedAt}</span>
                </div>
                {reEngagement.message && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground italic">&ldquo;{reEngagement.message}&rdquo;</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
