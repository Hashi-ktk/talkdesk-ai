"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/shared/page-header"
import { formatPhone } from "@/lib/formatters"
import smsThreadsData from "@/data/sms-threads.json"

export default function SmsThreadPage({ params }: { params: Promise<{ threadId: string }> }) {
  const { threadId } = use(params)
  const thread = (smsThreadsData as any[]).find((t) => t.id === threadId)

  if (!thread) return <div className="p-8 text-center text-muted-foreground">Thread not found</div>

  const messages = (thread.messages || []) as any[]

  return (
    <div>
      <PageHeader
        title={thread.customerName}
        description={formatPhone(thread.customerPhone)}
        actions={
          <Link href="/outbound"><Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button></Link>
        }
      />

      <Card className="max-w-2xl">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{thread.customerName}</CardTitle>
            <Badge variant="outline">{thread.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="py-4">
          <div className="space-y-4 max-h-[500px] overflow-y-auto mb-4">
            {messages.map((msg: any, idx: number) => (
              <div key={idx} className={`flex ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                  msg.sender === "customer"
                    ? "bg-muted text-foreground rounded-bl-md"
                    : "bg-primary text-primary-foreground rounded-br-md"
                }`}>
                  <p>{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === "customer" ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
                    {new Date(msg.timestamp).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t pt-4">
            <Input placeholder="Type a message..." className="flex-1" />
            <Button size="icon"><Send className="h-4 w-4" /></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
