"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Phone, Filter, Search, Building2, Home } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { formatPhone, formatDuration, formatDate } from "@/lib/formatters"
import callsData from "@/data/calls.json"

type Call = (typeof callsData)[number]

export default function CallsPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCalls = useMemo(() => {
    return (callsData as Call[])
      .filter((call) => {
        if (search && !call.customerName.toLowerCase().includes(search.toLowerCase()) && !call.customerPhone.includes(search)) return false
        if (typeFilter !== "all" && call.type !== typeFilter) return false
        if (statusFilter !== "all" && call.status !== statusFilter) return false
        return true
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [search, typeFilter, statusFilter])

  return (
    <div>
      <PageHeader
        title="Inbound Calls"
        description="View and manage all incoming call records"
        actions={
          <Link href="/calls/live">
            <Button className="bg-hvac-orange hover:bg-hvac-orange/90 text-white">
              <Phone className="h-4 w-4 mr-2" />
              Live Call Demo
            </Button>
          </Link>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or phone..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Call Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="install">Install</SelectItem>
                <SelectItem value="inquiry">Inquiry</SelectItem>
                <SelectItem value="complaint">Complaint</SelectItem>
                <SelectItem value="after-hours">After Hours</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="answered">Answered</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
                <SelectItem value="voicemail">Voicemail</SelectItem>
                <SelectItem value="transferred">Transferred</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>AI Handled</TableHead>
                <TableHead>Booked</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
                <TableRow key={call.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Link href={`/calls/${call.id}`} className="block">
                      <div className="font-medium text-sm">{call.customerName}</div>
                      <div className="text-xs text-muted-foreground">{formatPhone(call.customerPhone)}</div>
                    </Link>
                  </TableCell>
                  <TableCell><StatusBadge status={call.type} variant="callType" /></TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] gap-1">
                      {(call as any).propertyType === "commercial" ? (
                        <><Building2 className="h-3 w-3" />Commercial</>
                      ) : (
                        <><Home className="h-3 w-3" />Residential</>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell><StatusBadge status={call.status} /></TableCell>
                  <TableCell><StatusBadge status={call.urgency} variant="urgency" /></TableCell>
                  <TableCell className="text-sm">{call.duration > 0 ? formatDuration(call.duration) : "—"}</TableCell>
                  <TableCell>
                    <Badge variant={call.aiHandled ? "default" : "secondary"} className="text-[10px]">
                      {call.aiHandled ? "AI" : "Human"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {call.appointmentBooked ? (
                      <span className="text-green-600 text-sm font-medium">Yes</span>
                    ) : (
                      <span className="text-muted-foreground text-sm">No</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(call.timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredCalls.length} of {callsData.length} calls
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
