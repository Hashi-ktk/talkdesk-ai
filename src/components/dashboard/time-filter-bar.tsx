"use client"

import { useState } from "react"
import { Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const periods = ["1D", "1W", "1M", "3M", "6M", "1Y", "ALL"] as const

export function TimeFilterBar() {
  const [period, setPeriod] = useState<string>("1Y")

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
      <ToggleGroup
        type="single"
        value={period}
        onValueChange={(val) => { if (val) setPeriod(val) }}
        className="bg-muted rounded-lg p-1"
      >
        {periods.map((p) => (
          <ToggleGroupItem
            key={p}
            value={p}
            className="px-3 py-1 text-xs font-medium data-[state=on]:bg-background data-[state=on]:shadow-sm rounded-md transition-all duration-200"
          >
            {p}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-xs press-feedback transition-colors duration-200">
          <Filter className="h-3.5 w-3.5 mr-1.5" />
          Filters
        </Button>
        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs press-feedback transition-colors duration-200">
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Add a Call
        </Button>
      </div>
    </div>
  )
}
