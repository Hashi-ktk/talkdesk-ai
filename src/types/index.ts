export type CallType = "emergency" | "service" | "install" | "inquiry" | "complaint" | "after-hours"
export type CallStatus = "answered" | "missed" | "voicemail" | "transferred" | "in-progress"
export type UrgencyLevel = "low" | "medium" | "high" | "critical"
export type LeadSource = "angi" | "thumbtack" | "yelp" | "meta" | "google-lsa" | "website" | "referral"
export type LeadStatus = "new" | "contacted" | "qualified" | "booked" | "lost"
export type AppointmentType = "repair" | "maintenance" | "install" | "estimate" | "emergency"
export type AppointmentStatus = "scheduled" | "in-progress" | "completed" | "cancelled"
export type EquipmentType = "ac" | "furnace" | "heat-pump" | "boiler" | "mini-split" | "thermostat" | "water-heater"
export type EquipmentCondition = "excellent" | "good" | "fair" | "poor"
export type PropertyType = "residential" | "commercial"
export type FuelType = "gas" | "electric" | "oil"
export type TechnicianStatus = "available" | "on-job" | "off-duty" | "on-call"
export type CampaignType = "lead-rehash" | "unsold-estimates" | "membership-renewal" | "speed-to-lead"
export type CampaignStatus = "active" | "paused" | "completed" | "draft"
export type MaintenancePlanType = "basic" | "premium" | "elite"
export type MaintenancePlanStatus = "active" | "expired" | "pending-renewal"
export type SmsThreadStatus = "active" | "resolved" | "pending"
export type SmsSender = "ai" | "customer" | "agent"
export type SmsMessageStatus = "sent" | "delivered" | "read"
export type TranscriptSpeaker = "ai" | "customer"
export type Sentiment = "positive" | "neutral" | "negative" | "urgent"
export type NotificationType = "info" | "warning" | "success" | "error"
export type LiveFeedType = "call-started" | "call-ended" | "appointment-booked" | "emergency-detected" | "sms-received" | "lead-captured"
export type ContactStatus = "pending" | "called" | "answered" | "no-answer" | "scheduled" | "declined"
export type Priority = "low" | "normal" | "high" | "urgent"
export type TeamRole = "admin" | "manager" | "csr" | "technician"
export type TeamStatus = "active" | "inactive"

export interface InstallDetails {
  isReplacement: boolean
  currentSystem: string
  homeSizeSqFt: number
  floors: number
  timeline: string
  financingInterested: boolean
}

export interface Call {
  id: string
  customerName: string
  customerPhone: string
  type: CallType
  status: CallStatus
  urgency: UrgencyLevel
  duration: number
  timestamp: string
  summary: string
  aiHandled: boolean
  appointmentBooked: boolean
  transcriptId: string | null
  customerId: string | null
  propertyType?: PropertyType
  isHomeowner?: boolean
  installDetails?: InstallDetails
}

export interface Equipment {
  id: string
  type: EquipmentType
  brand: string
  model: string
  installDate: string
  warrantyExpiry: string
  lastService: string
  condition: EquipmentCondition
  fuelType?: FuelType
}

export interface MaintenancePlan {
  type: MaintenancePlanType
  status: MaintenancePlanStatus
  startDate: string
  endDate: string
  visitsPerYear: number
  price: number
  nextVisitDate: string
}

export interface ServiceHistoryItem {
  id: string
  date: string
  type: string
  description: string
  technicianId: string
  cost: number
  status: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  equipment: Equipment[]
  maintenancePlan: MaintenancePlan | null
  serviceHistory: ServiceHistoryItem[]
  tags: string[]
  createdAt: string
  notes: string
}

export interface LeadInteraction {
  id: string
  type: "call" | "sms" | "email" | "note"
  date: string
  summary: string
  outcome: string
}

export interface Lead {
  id: string
  name: string
  phone: string
  email: string
  source: LeadSource
  status: LeadStatus
  serviceType: string
  estimatedValue: number
  createdAt: string
  lastContactedAt: string | null
  notes: string
  interactions: LeadInteraction[]
  assignedTo: string | null
}

export interface CampaignContact {
  id: string
  name: string
  phone: string
  status: ContactStatus
  lastAttempt: string | null
  attempts: number
  outcome: string
}

export interface CampaignMetrics {
  totalContacts: number
  contacted: number
  answered: number
  booked: number
  revenue: number
  responseRate: number
  bookingRate: number
}

export interface Campaign {
  id: string
  name: string
  type: CampaignType
  status: CampaignStatus
  startDate: string
  endDate: string
  contacts: CampaignContact[]
  metrics: CampaignMetrics
}

export interface SmsMessage {
  id: string
  sender: SmsSender
  content: string
  timestamp: string
  status: SmsMessageStatus
}

export interface SmsThread {
  id: string
  customerName: string
  customerPhone: string
  messages: SmsMessage[]
  lastMessageAt: string
  unread: boolean
  status: SmsThreadStatus
}

export interface TranscriptLine {
  speaker: TranscriptSpeaker
  text: string
  timestamp: string
  sentiment: Sentiment
  tags: string[]
}

export interface Transcript {
  id: string
  callId: string
  lines: TranscriptLine[]
  startTime: string
  endTime: string
  summary: string
  emergencyDetected: boolean
  appointmentBooked: boolean
}

export interface Appointment {
  id: string
  customerId: string
  customerName: string
  customerPhone: string
  address: string
  technicianId: string
  type: AppointmentType
  date: string
  startTime: string
  endTime: string
  status: AppointmentStatus
  notes: string
  priority: Priority
}

export interface Technician {
  id: string
  name: string
  phone: string
  email: string
  specialties: string[]
  certifications: string[]
  avatar: string
  color: string
  status: TechnicianStatus
}

export interface DailyMetric {
  date: string
  totalCalls: number
  aiHandled: number
  transferred: number
  booked: number
  missed: number
  afterHours: number
}

export interface CsrScore {
  name: string
  score: number
  callsHandled: number
  avgDuration: number
  bookingRate: number
  customerSatisfaction: number
}

export interface CampaignROI {
  name: string
  spend: number
  revenue: number
  roi: number
  leads: number
  conversions: number
}

export interface AnalyticsData {
  containmentRate: number
  bookingRate: number
  avgResponseTime: number
  emergencySpeed: number
  afterHoursRate: number
  dailyMetrics: DailyMetric[]
  callsByType: Record<string, number>
  csrScores: CsrScore[]
  campaignROI: CampaignROI[]
}

export interface LiveFeedItem {
  id: string
  type: LiveFeedType
  title: string
  description: string
  timestamp: string
  urgent: boolean
  metadata?: Record<string, unknown>
}

export interface DashboardMetrics {
  todayCalls: number
  todayBooked: number
  containmentRate: number
  avgResponseTime: number
  comparisonPeriod: string
  callsTrend: number
  bookedTrend: number
  containmentTrend: number
  responseTrend: number
  liveFeed: LiveFeedItem[]
  recentActivity: ActivityItem[]
}

export interface ActivityItem {
  id: string
  type: string
  title: string
  description: string
  timestamp: string
  icon: string
}

export interface DayHours {
  day: string
  open: string
  close: string
  enabled: boolean
}

export interface RoutingRule {
  id: string
  name: string
  condition: string
  destination: string
  priority: number
  enabled: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: TeamRole
  email: string
  phone: string
  status: TeamStatus
  permissions: string[]
}

export interface Settings {
  businessHours: DayHours[]
  serviceAreaZips: string[]
  greetingScript: string
  afterHoursScript: string
  gasCOSafetyScript: string
  electricalSafetyScript: string
  newInstallScript: string
  followUpSurveyScript: string
  emergencyKeywords: string[]
  callRouting: RoutingRule[]
  team: TeamMember[]
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl: string | null
}
