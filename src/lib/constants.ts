export const APP_NAME = "All-Temp Heating & Cooling"
export const APP_DESCRIPTION = "AI-Powered Calling Agent Dashboard"

export const CALL_TYPES = ["emergency", "service", "install", "inquiry", "complaint", "after-hours"] as const
export const CALL_STATUSES = ["answered", "missed", "voicemail", "transferred", "in-progress"] as const
export const URGENCY_LEVELS = ["low", "medium", "high", "critical"] as const
export const LEAD_SOURCES = ["angi", "thumbtack", "yelp", "meta", "google-lsa", "website", "referral"] as const
export const LEAD_STATUSES = ["new", "contacted", "qualified", "booked", "lost"] as const
export const APPOINTMENT_TYPES = ["repair", "maintenance", "install", "estimate", "emergency"] as const
export const EQUIPMENT_TYPES = ["ac", "furnace", "heat-pump", "boiler", "mini-split", "thermostat", "water-heater"] as const

export const NAV_ITEMS = [
  { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { title: "Calls", href: "/calls", icon: "Phone", badge: "3" },
  { title: "Outbound", href: "/outbound", icon: "PhoneOutgoing" },
  { title: "Leads", href: "/leads", icon: "Users" },
  { title: "Customers", href: "/customers", icon: "UserCheck" },
  { title: "Schedule", href: "/schedule", icon: "Calendar" },
  { title: "Analytics", href: "/analytics", icon: "BarChart3" },
  { title: "Settings", href: "/settings", icon: "Settings" },
] as const

export const URGENCY_COLORS: Record<string, string> = {
  low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export const CALL_TYPE_COLORS: Record<string, string> = {
  emergency: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  service: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  install: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  inquiry: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  complaint: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "after-hours": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
}

export const STATUS_COLORS: Record<string, string> = {
  answered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  missed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  voicemail: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  transferred: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  "in-progress": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
}

export const LEAD_STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  contacted: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  qualified: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  booked: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  lost: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
}

export const TECHNICIAN_COLORS: Record<string, string> = {
  "tech-001": "#3B82F6",
  "tech-002": "#F97316",
  "tech-003": "#10B981",
  "tech-004": "#8B5CF6",
  "tech-005": "#EC4899",
}
