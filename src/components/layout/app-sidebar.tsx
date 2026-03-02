"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Phone,
  PhoneOutgoing,
  MessageSquare,
  Globe,
  Calendar,
  Link2,
  ChevronDown,
  GraduationCap,
  Heart,
  MessageCircle,
  Thermometer,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

const productItems = [
  { title: "Calls", href: "/calls", icon: Phone, badge: "3" },
  { title: "Coach", href: "/dashboard", icon: GraduationCap },
  { title: "Outbound", href: "/outbound", icon: PhoneOutgoing },
  { title: "Texts", href: "/outbound/sms", icon: MessageSquare },
  { title: "Web Chat", href: "/webchat", icon: Globe },
]

const controlItems = [
  { title: "Scheduling", href: "/schedule", icon: Calendar },
  { title: "Integrations", href: "/settings", icon: Link2 },
]

const adminItems = [
  { title: "Scheduling", href: "/schedule", icon: Calendar },
  { title: "Integrations", href: "/settings", icon: Link2 },
]

function NavGroup({ label, items, pathname }: { label: string; items: typeof productItems; pathname: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <SidebarMenuItem key={`${label}-${item.title}`}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.badge && (
                  <SidebarMenuBadge className="bg-hvac-orange text-white text-[10px] font-bold">
                    {item.badge}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Thermometer className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1 group-data-[collapsible=icon]:hidden">
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight">All-Temp</span>
              <span className="text-[11px] text-sidebar-foreground/60">Heating & Cooling</span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-sidebar-foreground/60 ml-1" />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NavGroup label="Products" items={productItems} pathname={pathname} />
        <NavGroup label="Controls" items={controlItems} pathname={pathname} />
        <NavGroup label="Administration" items={adminItems} pathname={pathname} />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4 group-data-[collapsible=icon]:p-2">
        <div className="space-y-3 group-data-[collapsible=icon]:space-y-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Support & Feedback">
                <Link href="#" className="text-xs">
                  <MessageCircle className="h-4 w-4" />
                  <span>Support & Feedback</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Refer a Friend">
                <Link href="#" className="text-xs">
                  <Heart className="h-4 w-4" />
                  <span>Refer a Friend</span>
                  <span className="ml-auto rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    $500
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-bold text-sidebar-accent-foreground">
              DJ
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-xs font-medium">DJ Meadows</span>
              <span className="text-[10px] text-sidebar-foreground/60">Admin</span>
            </div>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
