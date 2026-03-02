import type { Call, Customer, Lead, Campaign, SmsThread, Transcript, Appointment, Technician, AnalyticsData, DashboardMetrics, Notification, Settings } from "@/types"

import callsData from "@/data/calls.json"
import customersData from "@/data/customers.json"
import leadsData from "@/data/leads.json"
import campaignsData from "@/data/campaigns.json"
import smsThreadsData from "@/data/sms-threads.json"
import transcriptsData from "@/data/transcripts.json"
import appointmentsData from "@/data/appointments.json"
import techniciansData from "@/data/technicians.json"
import analyticsData from "@/data/analytics.json"
import dashboardMetricsData from "@/data/dashboard-metrics.json"
import settingsData from "@/data/settings.json"
import notificationsData from "@/data/notifications.json"

// Calls
export function getCalls(): Call[] {
  return callsData as unknown as Call[]
}

export function getCallById(id: string): Call | undefined {
  return (callsData as unknown as Call[]).find((c) => c.id === id)
}

export function getRecentCalls(limit = 10): Call[] {
  return (callsData as unknown as Call[])
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)
}

// Customers
export function getCustomers(): Customer[] {
  return customersData as unknown as Customer[]
}

export function getCustomerById(id: string): Customer | undefined {
  return (customersData as unknown as Customer[]).find((c) => c.id === id)
}

// Leads
export function getLeads(): Lead[] {
  return leadsData as unknown as Lead[]
}

export function getLeadById(id: string): Lead | undefined {
  return (leadsData as unknown as Lead[]).find((l) => l.id === id)
}

// Campaigns
export function getCampaigns(): Campaign[] {
  return campaignsData as unknown as Campaign[]
}

export function getCampaignById(id: string): Campaign | undefined {
  return (campaignsData as unknown as Campaign[]).find((c) => c.id === id)
}

// SMS Threads
export function getSmsThreads(): SmsThread[] {
  return smsThreadsData as unknown as SmsThread[]
}

export function getSmsThreadById(id: string): SmsThread | undefined {
  return (smsThreadsData as unknown as SmsThread[]).find((t) => t.id === id)
}

// Transcripts
export function getTranscripts(): Transcript[] {
  return transcriptsData as unknown as Transcript[]
}

export function getTranscriptById(id: string): Transcript | undefined {
  return (transcriptsData as unknown as Transcript[]).find((t) => t.id === id)
}

export function getTranscriptByCallId(callId: string): Transcript | undefined {
  return (transcriptsData as unknown as Transcript[]).find((t) => t.callId === callId)
}

// Appointments
export function getAppointments(): Appointment[] {
  return appointmentsData as unknown as Appointment[]
}

export function getAppointmentsByDate(date: string): Appointment[] {
  return (appointmentsData as unknown as Appointment[]).filter((a) => a.date === date)
}

export function getAppointmentsByTechnician(techId: string): Appointment[] {
  return (appointmentsData as unknown as Appointment[]).filter((a) => a.technicianId === techId)
}

// Technicians
export function getTechnicians(): Technician[] {
  return techniciansData as unknown as Technician[]
}

export function getTechnicianById(id: string): Technician | undefined {
  return (techniciansData as unknown as Technician[]).find((t) => t.id === id)
}

// Analytics
export function getAnalytics(): AnalyticsData {
  return analyticsData as unknown as AnalyticsData
}

// Dashboard
export function getDashboardMetrics(): DashboardMetrics {
  return dashboardMetricsData as unknown as DashboardMetrics
}

// Settings
export function getSettings(): Settings {
  return settingsData as unknown as Settings
}

// Notifications
export function getNotifications(): Notification[] {
  return notificationsData as unknown as Notification[]
}
