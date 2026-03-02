"use client"

import { RefreshCw, CheckCircle, XCircle, AlertCircle, ArrowRight, Cloud } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { formatDate } from "@/lib/formatters"
import reclassificationData from "@/data/reclassification.json"

const data = reclassificationData as any

export default function ReclassificationPage() {
  return (
    <div>
      <PageHeader title="Call Reclassification" description="Review and approve AI-suggested call type reclassifications" />

      {/* KPI Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Accuracy Rate</p>
                <p className="text-2xl font-bold">{data.stats.accuracyRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">{data.stats.pendingReview}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reclassified</p>
                <p className="text-2xl font-bold">{data.stats.totalReclassified}</p>
              </div>
              <RefreshCw className="h-8 w-8 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Synced to ST</p>
                <p className="text-2xl font-bold">{data.stats.syncedToServiceTitan}</p>
                {data.stats.pendingSync > 0 && (
                  <p className="text-xs text-orange-500">{data.stats.pendingSync} pending</p>
                )}
              </div>
              <Cloud className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Reviews */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            Pending Reviews ({data.pendingReviews.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(data.pendingReviews as any[]).map((review: any) => (
              <div key={review.id} className="p-4 rounded-lg border bg-muted/20">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{review.customerName}</p>
                      <Badge variant="outline" className="text-[10px]">{review.callId}</Badge>
                      <Badge variant={review.source === "ai" ? "secondary" : "default"} className="text-[10px]">
                        {review.source === "ai" ? "AI Suggested" : "Manual"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{formatDate(review.timestamp)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">{(review.confidence * 100).toFixed(0)}% confidence</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <StatusBadge status={review.originalType} variant="callType" />
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <StatusBadge status={review.suggestedType} variant="callType" />
                </div>

                <p className="text-sm text-muted-foreground mb-3">{review.reason}</p>

                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <XCircle className="h-3.5 w-3.5 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Reclassification History</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Original</TableHead>
                <TableHead></TableHead>
                <TableHead>New Type</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Sync</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data.history as any[]).map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{item.customerName}</p>
                      <p className="text-xs text-muted-foreground">{item.callId}</p>
                    </div>
                  </TableCell>
                  <TableCell><StatusBadge status={item.originalType} variant="callType" /></TableCell>
                  <TableCell><ArrowRight className="h-3.5 w-3.5 text-muted-foreground" /></TableCell>
                  <TableCell><StatusBadge status={item.newType} variant="callType" /></TableCell>
                  <TableCell>
                    <Badge variant={item.source === "ai" ? "secondary" : "default"} className="text-[10px]">
                      {item.source === "ai" ? "AI" : "Manual"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.reviewedBy || "Auto"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.syncStatus === "synced" ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {item.syncStatus === "synced" ? "Synced" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
