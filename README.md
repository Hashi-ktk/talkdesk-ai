# All-Temp AI - Calling Agent Dashboard

> Smart Calls, Real Results

AI-powered calling agent dashboard for HVAC service companies. Manages inbound/outbound calls, customer relationships, lead pipelines, technician scheduling, and performance analytics — all from a single unified interface.

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript 5
- **UI:** React 19, Shadcn UI, Radix UI primitives
- **Styling:** Tailwind CSS 4, CSS variables theming, dark mode
- **Charts:** Recharts
- **Tables:** TanStack React Table
- **Icons:** Lucide React

## Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd calling-agent
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open the app**

   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Login credentials (demo)**

   ```
   Email:    demo@example.com
   Password: Demo@123
   ```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (fonts, theme provider)
│   ├── page.tsx                # Entry point (redirects to /login)
│   ├── login/                  # Authentication page
│   └── (dashboard)/            # Dashboard route group
│       ├── layout.tsx          # Dashboard shell (sidebar + header)
│       ├── dashboard/          # Home / KPI overview
│       ├── calls/              # Inbound call management
│       │   ├── page.tsx        # Call list with filters
│       │   ├── live/           # Live call simulation
│       │   └── [callId]/       # Call detail + transcript
│       ├── leads/              # Lead pipeline (table + kanban)
│       │   └── [leadId]/       # Lead detail
│       ├── customers/          # Customer database
│       │   └── [customerId]/   # Customer profile
│       ├── outbound/           # Campaigns & speed-to-lead
│       │   ├── sms/            # SMS threads
│       │   │   └── [threadId]/ # Thread detail
│       │   └── [campaignId]/   # Campaign detail
│       ├── analytics/          # Reports & performance charts
│       ├── schedule/           # Technician calendar
│       ├── webchat/            # Chat widget config
│       ├── reclassification/   # AI call type review
│       └── settings/           # System configuration
│
├── components/
│   ├── ui/                     # Shadcn UI components (28 components)
│   ├── layout/                 # App sidebar & header
│   ├── dashboard/              # Dashboard-specific widgets
│   ├── calls/                  # Call module components
│   ├── customers/              # Customer module components
│   ├── leads/                  # Lead module components
│   ├── outbound/               # Campaign module components
│   ├── analytics/              # Chart & report components
│   ├── schedule/               # Calendar components
│   ├── settings/               # Settings form components
│   └── shared/                 # Reusable (PageHeader, StatCard, StatusBadge)
│
├── data/                       # Mock JSON data (16 files)
│   ├── calls.json
│   ├── customers.json
│   ├── leads.json
│   ├── campaigns.json
│   ├── sms-threads.json
│   ├── transcripts.json
│   ├── appointments.json
│   ├── technicians.json
│   ├── analytics.json
│   ├── dashboard-metrics.json
│   ├── coach-dashboard.json
│   ├── webchat.json
│   ├── settings.json
│   ├── reclassification.json
│   ├── re-engagement.json
│   └── notifications.json
│
├── lib/
│   ├── utils.ts                # Tailwind class merge utility
│   ├── formatters.ts           # Date, phone, currency formatting
│   ├── data.ts                 # Data access layer (JSON loaders)
│   └── constants.ts            # Color maps, status labels, enums
│
├── types/
│   └── index.ts                # All TypeScript type definitions
│
├── hooks/
│   └── use-mobile.tsx          # Mobile breakpoint detection
│
└── providers/
    └── theme-provider.tsx      # Light/dark theme context
```

## Modules

### Dashboard (`/dashboard`)
KPI overview with total calls, lead %, booked %, performance trend charts, unbooked reasons breakdown, missed booking recovery stats, live activity feed, and recent calls table. Supports time range filtering.

### Calls (`/calls`)
Searchable/filterable inbound call list. Each call detail page shows metadata, AI handling status, install qualification, full transcript with sentiment tags, linked customer profile, and re-engagement tracking. Includes a **live call simulation** at `/calls/live` demonstrating real-time AI emergency handling.

### Leads (`/leads`)
Dual-view lead pipeline — **table** and **kanban board**. Stages: New → Contacted → Qualified → Booked → Lost. Tracks leads from Google LSA, Angi, Thumbtack, Yelp, Meta, Website, and Referrals. Each lead has a detail page with full interaction history.

### Customers (`/customers`)
Customer database (300+ records) searchable by name, phone, email, or city. Customer profiles include equipment inventory, maintenance plan status, service history, and call history.

### Outbound (`/outbound`)
Three sub-modules:
- **Campaigns** — Create and track outbound calling campaigns with progress, booking rates, and revenue
- **Speed-to-Lead** — Response time metrics broken down by lead source
- **SMS** (`/outbound/sms`) — SMS thread management with read/unread status and conversation history

### Analytics (`/analytics`)
Performance dashboards with KPI cards (containment rate, booking rate, response times, after-hours rate, campaign revenue), after-hours vs regular call charts, campaign ROI breakdown, and CSR performance scores.

### Schedule (`/schedule`)
Weekly calendar view with color-coded technician assignments. Sidebar shows technician capacity (hours allocated vs available). Appointment types: repair, maintenance, install, estimate, emergency.

### Web Chat (`/webchat`)
Chat widget preview and configuration. Stats for total chats, booking rate, chat-to-call rate, and response time. Configuration options: phone-first mode, SMS re-engagement, wait time settings.

### Reclassification (`/reclassification`)
AI call classification accuracy tracking. Review queue for flagged calls showing original vs suggested type with confidence scores. Approve/reject workflow with ServiceTitan sync status.

### Settings (`/settings`)
- **Business Hours** — Operating hours per day
- **Service Area** — ZIP code management
- **AI Scripts** — Greeting, after-hours, safety, new install, follow-up survey
- **Emergency Keywords** — Trigger words for emergency escalation
- **Call Routing Rules** — Priority-based routing configuration
- **Team Members** — Directory and role management

## Path Aliases

The project uses `@/*` as a path alias mapping to `./src/*`:

```typescript
import { Button } from "@/components/ui/button"
import { getCalls } from "@/lib/data"
import type { Call } from "@/types"
```

## Theming

The app supports **light** and **dark** modes via `next-themes`. Theme colors are defined as CSS variables in `src/app/globals.css`. The Shadcn UI configuration uses the `neutral` base color palette.

Custom colors include:
- HVAC orange for primary actions
- Status colors: red (critical), orange (high), yellow (medium), green (low)
- Call type colors: red (emergency), blue (service), purple (install), cyan (inquiry), orange (complaint), indigo (after-hours)

## Data Layer

All data is currently served from static JSON files in `src/data/`. The data access layer in `src/lib/data.ts` provides typed helper functions:

```typescript
getCalls()              // All calls
getCallById(id)         // Single call by ID
getRecentCalls(limit)   // Most recent N calls
getCustomers()          // All customers
getCustomerById(id)     // Single customer
getLeads()              // All leads
getLeadById(id)         // Single lead
getCampaigns()          // All campaigns
getSmsThreads()         // All SMS threads
getTranscripts()        // All transcripts
getAppointments()       // All appointments
getTechnicians()        // All technicians
getAnalytics()          // Analytics data
getDashboardMetrics()   // Dashboard KPIs
getSettings()           // App settings
```

To connect to a real backend, replace the JSON imports in `src/lib/data.ts` with API calls.

## Production Build

The app is configured with `output: "standalone"` in `next.config.ts` for containerized deployment:

```bash
# Build
npm run build

# The standalone output is in .next/standalone/
# Copy static assets
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# Run
node .next/standalone/server.js
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
