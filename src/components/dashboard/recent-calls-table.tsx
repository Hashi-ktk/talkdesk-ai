"use client"

import { Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface RecentCall {
  id: string
  summary: string
  score: number
  agent: string
  customer: string
  duration: string
}

interface RecentCallsTableProps {
  calls: RecentCall[]
}

function getScoreColor(score: number) {
  if (score >= 85) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
  if (score >= 70) return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
  if (score >= 50) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
  return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
}

export function RecentCallsTable({ calls }: RecentCallsTableProps) {
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Recent Calls</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-xs press-feedback">
            <Filter className="h-3.5 w-3.5 mr-1.5" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="text-xs press-feedback">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Summary</TableHead>
              <TableHead className="text-xs w-[80px]">Score</TableHead>
              <TableHead className="text-xs">Agent</TableHead>
              <TableHead className="text-xs">Customer</TableHead>
              <TableHead className="text-xs w-[80px] text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls.map((call, i) => (
              <TableRow
                key={call.id}
                className="animate-fade-in-row hover:bg-muted/50 transition-colors"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <TableCell className="text-sm max-w-[300px] truncate">
                  {call.summary}
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-transform hover:scale-105 ${getScoreColor(call.score)}`}>
                    {call.score}
                  </span>
                </TableCell>
                <TableCell className="text-sm">{call.agent}</TableCell>
                <TableCell className="text-sm">{call.customer}</TableCell>
                <TableCell className="text-sm text-right text-muted-foreground">
                  {call.duration}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
