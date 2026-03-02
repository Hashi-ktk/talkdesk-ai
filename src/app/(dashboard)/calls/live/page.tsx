"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, PhoneOff, AlertTriangle, Calendar, User, MapPin, Thermometer, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PageHeader } from "@/components/shared/page-header"
import transcriptsData from "@/data/transcripts.json"

const transcript = (transcriptsData as any[])[0] // Emergency transcript
const lines = transcript.lines as any[]

export default function LiveCallPage() {
  const [currentLineIndex, setCurrentLineIndex] = useState(-1)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const [emergencyDetected, setEmergencyDetected] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [completedLines, setCompletedLines] = useState<any[]>([])

  const startCall = useCallback(() => {
    setIsCallActive(true)
    setCurrentLineIndex(0)
    setCompletedLines([])
    setDisplayedText("")
    setEmergencyDetected(false)
    setCallDuration(0)
  }, [])

  // Timer
  useEffect(() => {
    if (!isCallActive) return
    const timer = setInterval(() => setCallDuration(prev => prev + 1), 1000)
    return () => clearInterval(timer)
  }, [isCallActive])

  // Line progression with typing effect
  useEffect(() => {
    if (currentLineIndex < 0 || currentLineIndex >= lines.length || !isCallActive) return

    const line = lines[currentLineIndex]
    const text = line.text as string
    setIsTyping(true)
    setDisplayedText("")

    // Check for emergency keywords
    if ((line.tags as string[])?.some((t: string) => ["emergency", "no-heat", "co-detector", "gas-smell"].includes(t))) {
      setEmergencyDetected(true)
    }

    let charIndex = 0
    const typingSpeed = line.speaker === "ai" ? 20 : 35

    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        setCompletedLines(prev => [...prev, { ...line, text }])
        setDisplayedText("")

        // Move to next line after pause
        setTimeout(() => {
          if (currentLineIndex < lines.length - 1) {
            setCurrentLineIndex(prev => prev + 1)
          } else {
            setIsCallActive(false)
          }
        }, 1200)
      }
    }, typingSpeed)

    return () => clearInterval(typeInterval)
  }, [currentLineIndex, isCallActive])

  const progress = lines.length > 0 ? ((currentLineIndex + 1) / lines.length) * 100 : 0

  return (
    <div>
      <PageHeader
        title="Live Call Simulation"
        description="Watch the AI agent handle a real emergency call in real-time"
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
        <div className="lg:col-span-2 space-y-4">
          {/* Call Control Bar */}
          <Card className={`${isCallActive ? "border-green-500 dark:border-green-700" : ""}`}>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isCallActive ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                      <Phone className="h-5 w-5 text-green-600 animate-pulse" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <PhoneOff className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-sm">
                      {isCallActive ? "Call In Progress" : currentLineIndex >= lines.length - 1 && completedLines.length > 0 ? "Call Ended" : "Ready to Simulate"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isCallActive
                        ? `Duration: ${Math.floor(callDuration / 60)}:${(callDuration % 60).toString().padStart(2, "0")}`
                        : "Emergency no-heat scenario"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!isCallActive && (
                    <Button onClick={startCall} className="bg-green-600 hover:bg-green-700 text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      {completedLines.length > 0 ? "Replay Call" : "Start Simulation"}
                    </Button>
                  )}
                  {isCallActive && (
                    <Button variant="destructive" onClick={() => setIsCallActive(false)}>
                      <PhoneOff className="h-4 w-4 mr-2" />
                      End Call
                    </Button>
                  )}
                </div>
              </div>
              {isCallActive && <Progress value={progress} className="mt-3 h-1" />}
            </CardContent>
          </Card>

          {/* Emergency Alert */}
          {emergencyDetected && (
            <Card className="border-red-300 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30 animate-slide-in-right">
              <CardContent className="py-3 flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 animate-pulse" />
                <div>
                  <p className="font-bold text-sm text-red-700 dark:text-red-400">EMERGENCY DETECTED</p>
                  <p className="text-xs text-red-600 dark:text-red-400">No heat - Critical temperature. Auto-flagged for priority dispatch.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transcript */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Live Transcript</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {completedLines.map((line: any, idx: number) => (
                  <div key={idx} className={`flex gap-3 ${line.speaker === "ai" ? "" : "flex-row-reverse"}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      line.speaker === "ai" ? "bg-primary text-primary-foreground" : "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300"
                    }`}>
                      {line.speaker === "ai" ? "AI" : "C"}
                    </div>
                    <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      line.speaker === "ai" ? "bg-primary/10" : "bg-orange-50 dark:bg-orange-950/20"
                    }`}>
                      {line.text}
                    </div>
                  </div>
                ))}

                {/* Currently typing */}
                {isTyping && currentLineIndex >= 0 && currentLineIndex < lines.length && (
                  <div className={`flex gap-3 ${lines[currentLineIndex].speaker === "ai" ? "" : "flex-row-reverse"}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      lines[currentLineIndex].speaker === "ai" ? "bg-primary text-primary-foreground" : "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300"
                    }`}>
                      {lines[currentLineIndex].speaker === "ai" ? "AI" : "C"}
                    </div>
                    <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      lines[currentLineIndex].speaker === "ai" ? "bg-primary/10" : "bg-orange-50 dark:bg-orange-950/20"
                    }`}>
                      {displayedText}
                      <span className="inline-block w-0.5 h-4 bg-foreground ml-0.5 animate-typing-cursor" />
                    </div>
                  </div>
                )}

                {!isCallActive && completedLines.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    <Phone className="h-8 w-8 mx-auto mb-3 opacity-50" />
                    <p>Click &quot;Start Simulation&quot; to watch the AI handle an emergency call</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Context Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Caller Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Customer</p>
                <p className="font-medium">Frank DiNardo</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p>(484) 432-7756</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <p>2100 Darby Road, Havertown, PA 19083</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Customer Since</p>
                <p>2019</p>
              </div>
              <Badge variant="outline">Existing Customer</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Equipment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="p-2 bg-muted rounded-md">
                <p className="font-medium">Bryant Gas Furnace</p>
                <p className="text-xs text-muted-foreground">Model: 315AAV048080 | Installed: 2019</p>
                <Badge variant="outline" className="mt-1 text-[10px]">Warranty Active</Badge>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="font-medium">Bryant Central AC</p>
                <p className="text-xs text-muted-foreground">Model: 226ANA048 | Installed: 2019</p>
                <Badge variant="outline" className="mt-1 text-[10px]">Warranty Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" />
                AI Actions Taken
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {isCallActive || completedLines.length > 0 ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Customer identified</span>
                  </div>
                  {emergencyDetected && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        <span>Emergency flagged</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span>Safety check performed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        <span>Tech dispatched: Mike Torres</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span>Appointment booked: 7:00 AM</span>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground text-xs">Actions will appear as the call progresses...</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
