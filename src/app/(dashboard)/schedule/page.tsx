"use client"

import { useState, useMemo, Fragment } from "react"
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/shared/page-header"
import { formatTime } from "@/lib/formatters"
import { TECHNICIAN_COLORS } from "@/lib/constants"
import appointmentsData from "@/data/appointments.json"
import techniciansData from "@/data/technicians.json"

const appointments = appointmentsData as any[]
const technicians = techniciansData as any[]
const timeSlots = Array.from({ length: 13 }, (_, i) => `${(7 + i).toString().padStart(2, "0")}:00`)
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Generate week dates around Feb 27, 2026
const weekDates = ["2026-02-23", "2026-02-24", "2026-02-25", "2026-02-26", "2026-02-27", "2026-02-28"]

export default function SchedulePage() {
  const [selectedTech, setSelectedTech] = useState<string | "all">("all")
  const [currentWeekStart, setCurrentWeekStart] = useState(0)

  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => {
      if (selectedTech !== "all" && a.technicianId !== selectedTech) return false
      return true
    })
  }, [selectedTech])

  function getAppointmentsForSlot(date: string, hour: string) {
    return filteredAppointments.filter((a) => {
      if (a.date !== date) return false
      const startHour = parseInt(a.startTime.split(":")[0])
      const endHour = parseInt(a.endTime.split(":")[0])
      const slotHour = parseInt(hour.split(":")[0])
      return slotHour >= startHour && slotHour < endHour
    })
  }

  return (
    <div>
      <PageHeader
        title="Schedule"
        description="Manage technician appointments and capacity"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setCurrentWeekStart(prev => prev - 1)}><ChevronLeft className="h-4 w-4" /></Button>
            <span className="text-sm font-medium px-3">Feb 23 - Feb 28, 2026</span>
            <Button variant="outline" size="icon" onClick={() => setCurrentWeekStart(prev => prev + 1)}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        }
      />

      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {/* Technician Filter Sidebar */}
        <div className="space-y-3">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Technicians</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedTech === "all" ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setSelectedTech("all")}
              >
                All Technicians
              </Button>
              {technicians.map((tech) => {
                const techAppts = appointments.filter((a) => a.technicianId === tech.id && weekDates.includes(a.date))
                return (
                  <Button
                    key={tech.id}
                    variant={selectedTech === tech.id ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start gap-2"
                    onClick={() => setSelectedTech(tech.id)}
                  >
                    <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: tech.color }} />
                    <span className="truncate">{tech.name}</span>
                    <Badge variant="secondary" className="ml-auto text-[10px]">{techAppts.length}</Badge>
                  </Button>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Today&apos;s Capacity</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {technicians.map((tech) => {
                const todayAppts = appointments.filter((a) => a.technicianId === tech.id && a.date === "2026-02-27")
                const hours = todayAppts.reduce((sum, a) => {
                  const start = parseInt(a.startTime.split(":")[0])
                  const end = parseInt(a.endTime.split(":")[0])
                  return sum + (end - start)
                }, 0)
                const capacity = Math.min(100, (hours / 10) * 100)
                return (
                  <div key={tech.id} className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: tech.color }} />
                    <span className="flex-1 truncate text-xs">{tech.name}</span>
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${capacity}%`, backgroundColor: tech.color }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground w-8 text-right">{hours}h</span>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="pt-6 overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Header */}
                <div className="grid grid-cols-[60px_repeat(6,1fr)] gap-px mb-2">
                  <div />
                  {weekDates.map((date, idx) => {
                    const isToday = date === "2026-02-27"
                    return (
                      <div key={date} className={`text-center p-2 rounded-lg ${isToday ? "bg-primary text-primary-foreground" : ""}`}>
                        <p className="text-xs font-medium">{weekDays[idx]}</p>
                        <p className="text-lg font-bold">{new Date(date + "T12:00:00").getDate()}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Time Grid */}
                <div className="grid grid-cols-[60px_repeat(6,1fr)] gap-px">
                  {timeSlots.map((slot) => (
                    <Fragment key={slot}>
                      <div className="text-[10px] text-muted-foreground text-right pr-2 py-2">
                        {formatTime(slot)}
                      </div>
                      {weekDates.map((date) => {
                        const slotAppts = getAppointmentsForSlot(date, slot)
                        const isFirstSlot = slotAppts.length > 0 && slotAppts.some((a) => a.startTime === slot)
                        return (
                          <div key={`${date}-${slot}`} className="border-t border-border/50 min-h-[36px] relative">
                            {isFirstSlot && slotAppts.filter((a) => a.startTime === slot).map((apt) => {
                              const tech = technicians.find((t) => t.id === apt.technicianId)
                              const startH = parseInt(apt.startTime.split(":")[0])
                              const endH = parseInt(apt.endTime.split(":")[0])
                              const height = (endH - startH) * 36
                              return (
                                <div
                                  key={apt.id}
                                  className="absolute inset-x-0.5 rounded-md p-1.5 text-white text-[10px] overflow-hidden z-10 cursor-pointer hover:opacity-90"
                                  style={{
                                    backgroundColor: tech?.color || "#6b7280",
                                    height: `${height}px`,
                                    opacity: apt.status === "cancelled" ? 0.4 : 1,
                                  }}
                                >
                                  <p className="font-bold truncate">{apt.customerName}</p>
                                  <p className="truncate opacity-80">{apt.type} | {formatTime(apt.startTime)}-{formatTime(apt.endTime)}</p>
                                </div>
                              )
                            })}
                          </div>
                        )
                      })}
                    </Fragment>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
