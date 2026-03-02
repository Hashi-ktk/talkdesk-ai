"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Users, LayoutGrid, List, Search, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { formatCurrency, formatPhone, formatDate } from "@/lib/formatters"
import { LEAD_STATUS_COLORS } from "@/lib/constants"
import leadsData from "@/data/leads.json"

const leads = leadsData as any[]
const pipelineStages = ["new", "contacted", "qualified", "booked", "lost"]

export default function LeadsPage() {
  const [view, setView] = useState<"table" | "kanban">("table")
  const [search, setSearch] = useState("")
  const [sourceFilter, setSourceFilter] = useState("all")

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false
      if (sourceFilter !== "all" && l.source !== sourceFilter) return false
      return true
    })
  }, [search, sourceFilter])

  return (
    <div>
      <PageHeader
        title="Leads"
        description={`${leads.length} total leads from all sources`}
        actions={
          <div className="flex gap-2">
            <Button variant={view === "table" ? "default" : "outline"} size="sm" onClick={() => setView("table")}><List className="h-4 w-4" /></Button>
            <Button variant={view === "kanban" ? "default" : "outline"} size="sm" onClick={() => setView("kanban")}><LayoutGrid className="h-4 w-4" /></Button>
          </div>
        }
      />

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search leads..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Source" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="google-lsa">Google LSA</SelectItem>
            <SelectItem value="angi">Angi</SelectItem>
            <SelectItem value="thumbtack">Thumbtack</SelectItem>
            <SelectItem value="yelp">Yelp</SelectItem>
            <SelectItem value="meta">Meta Ads</SelectItem>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="referral">Referral</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {view === "table" ? (
        <Card>
          <CardContent className="pt-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Est. Value</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((lead) => (
                  <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Link href={`/leads/${lead.id}`} className="block">
                        <p className="font-medium text-sm">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{formatPhone(lead.phone)}</p>
                      </Link>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{lead.source}</Badge></TableCell>
                    <TableCell><StatusBadge status={lead.status} variant="leadStatus" /></TableCell>
                    <TableCell className="text-sm">{lead.serviceType}</TableCell>
                    <TableCell className="text-sm font-medium">{formatCurrency(lead.estimatedValue)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(lead.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {pipelineStages.map((stage) => {
            const stageLeads = filtered.filter((l) => l.status === stage)
            return (
              <div key={stage} className="space-y-3">
                <div className="flex items-center justify-between px-2">
                  <span className="text-sm font-medium capitalize">{stage}</span>
                  <Badge variant="secondary" className="text-[10px]">{stageLeads.length}</Badge>
                </div>
                <div className="space-y-2 min-h-[200px] bg-muted/30 rounded-lg p-2">
                  {stageLeads.map((lead) => (
                    <Link key={lead.id} href={`/leads/${lead.id}`}>
                      <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                        <CardContent className="p-3">
                          <p className="font-medium text-sm">{lead.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{lead.serviceType}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className="text-[9px]">{lead.source}</Badge>
                            <span className="text-xs font-medium text-green-600">{formatCurrency(lead.estimatedValue)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
