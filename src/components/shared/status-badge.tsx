import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { STATUS_COLORS, URGENCY_COLORS, CALL_TYPE_COLORS, LEAD_STATUS_COLORS } from "@/lib/constants"
import { capitalize } from "@/lib/formatters"

interface StatusBadgeProps {
  status: string
  variant?: "status" | "urgency" | "callType" | "leadStatus"
  className?: string
}

const colorMaps: Record<string, Record<string, string>> = {
  status: STATUS_COLORS,
  urgency: URGENCY_COLORS,
  callType: CALL_TYPE_COLORS,
  leadStatus: LEAD_STATUS_COLORS,
}

export function StatusBadge({ status, variant = "status", className }: StatusBadgeProps) {
  const colors = colorMaps[variant]?.[status] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"

  return (
    <Badge
      variant="outline"
      className={cn(
        "border-0 text-[11px] font-medium px-2 py-0.5",
        colors,
        className
      )}
    >
      {capitalize(status)}
    </Badge>
  )
}
