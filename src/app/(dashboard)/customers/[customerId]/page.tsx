"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, Mail, MapPin, Wrench, Shield, Calendar, DollarSign, Clock, Flame, Zap, Droplets } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/shared/page-header"
import { formatPhone, formatCurrency, formatShortDate } from "@/lib/formatters"
import customersData from "@/data/customers.json"

function getFuelIcon(fuelType: string) {
  switch (fuelType) {
    case "gas": return <Flame className="h-3 w-3 text-orange-500" />
    case "electric": return <Zap className="h-3 w-3 text-blue-500" />
    case "oil": return <Droplets className="h-3 w-3 text-amber-700" />
    default: return null
  }
}

function getFuelLabel(fuelType: string) {
  switch (fuelType) {
    case "gas": return "Gas"
    case "electric": return "Electric"
    case "oil": return "Oil"
    default: return "Unknown"
  }
}

export default function CustomerDetailPage({ params }: { params: Promise<{ customerId: string }> }) {
  const { customerId } = use(params)
  const customer = (customersData as any[]).find((c) => c.id === customerId)

  if (!customer) return <div className="p-8 text-center text-muted-foreground">Customer not found</div>

  const addr = typeof customer.address === "string" ? customer.address : `${customer.address?.street}, ${customer.address?.city}, ${customer.address?.state} ${customer.address?.zip}`
  const equipment = (customer.equipment || []) as any[]
  const history = (customer.serviceHistory || []) as any[]

  return (
    <div>
      <PageHeader
        title={customer.name}
        actions={
          <Link href="/customers"><Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button></Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Equipment */}
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Wrench className="h-4 w-4" />Equipment ({equipment.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {equipment.map((eq: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg border bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{eq.brand} {eq.type?.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}</p>
                      <Badge variant={eq.condition === "excellent" ? "default" : eq.condition === "good" ? "secondary" : "destructive"} className="text-[10px]">{eq.condition}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Model: {eq.model}</p>
                    {eq.fuelType && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>Fuel:</span>
                        <span className="flex items-center gap-1">
                          {getFuelIcon(eq.fuelType)}
                          {getFuelLabel(eq.fuelType)}
                        </span>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">Installed: {eq.installDate}</p>
                    <p className="text-xs text-muted-foreground">Warranty: {new Date(eq.warrantyExpiry) > new Date() ? "Active" : "Expired"} ({eq.warrantyExpiry})</p>
                    <p className="text-xs text-muted-foreground">Last Service: {eq.lastService}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service History */}
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4" />Service History</CardTitle></CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className="space-y-3">
                  {history.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-start justify-between p-3 rounded-lg border bg-muted/20">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{item.type}</p>
                          <Badge variant="outline" className="text-[10px]">{item.status || "completed"}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.description || item.notes}</p>
                        <p className="text-xs text-muted-foreground">Tech: {item.technicianId || item.tech} | Date: {item.date}</p>
                      </div>
                      <p className="text-sm font-medium">{item.cost > 0 ? formatCurrency(item.cost) : "Included"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-6">No service history</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Contact Info</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" />{formatPhone(customer.phone)}</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" />{customer.email}</div>
              <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-muted-foreground mt-0.5" /><span>{addr}</span></div>
              <Separator />
              <div className="flex flex-wrap gap-1">
                {(customer.tags as string[])?.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                ))}
              </div>
              {customer.notes && (
                <>
                  <Separator />
                  <p className="text-xs text-muted-foreground">{customer.notes}</p>
                </>
              )}
            </CardContent>
          </Card>

          {customer.maintenancePlan && (
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" />Maintenance Plan</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Plan</span><Badge>{customer.maintenancePlan.type}</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge variant="outline">{customer.maintenancePlan.status}</Badge></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="font-medium">{formatCurrency(customer.maintenancePlan.price)}/yr</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Visits/Year</span><span>{customer.maintenancePlan.visitsPerYear}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Next Visit</span><span>{customer.maintenancePlan.nextVisitDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Expires</span><span>{customer.maintenancePlan.endDate}</span></div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
