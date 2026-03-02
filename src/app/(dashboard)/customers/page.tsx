"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, UserCheck, Shield, Wrench } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/shared/page-header"
import { formatPhone } from "@/lib/formatters"
import customersData from "@/data/customers.json"

const customers = customersData as any[]

export default function CustomersPage() {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search) return customers
    const q = search.toLowerCase()
    return customers.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(search) ||
      c.email?.toLowerCase().includes(q) ||
      (typeof c.address === "string" ? c.address : `${c.address?.city}`).toLowerCase().includes(q)
    )
  }, [search])

  return (
    <div>
      <PageHeader title="Customers" description={`${customers.length} customers in your database`} />

      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, phone, email, or city..." className="pl-8" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Tags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((customer) => {
                const addr = typeof customer.address === "string" ? customer.address : `${customer.address?.city}, ${customer.address?.state} ${customer.address?.zip}`
                return (
                  <TableRow key={customer.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Link href={`/customers/${customer.id}`} className="block">
                        <p className="font-medium text-sm">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{formatPhone(customer.phone)}</p>
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{addr}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Wrench className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{(customer.equipment as any[])?.length || 0} unit{(customer.equipment as any[])?.length !== 1 ? "s" : ""}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {customer.maintenancePlan ? (
                        <Badge variant="outline" className="text-[10px]">
                          {customer.maintenancePlan.type} - {customer.maintenancePlan.status}
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">None</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(customer.tags as string[])?.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-[9px]">{tag}</Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
