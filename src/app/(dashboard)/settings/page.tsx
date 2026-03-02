"use client"

import { Clock, MapPin, MessageSquare, AlertTriangle, Phone, Users, Flame, Zap, Home, ClipboardCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/shared/page-header"
import { formatTime, formatPhone } from "@/lib/formatters"
import settingsData from "@/data/settings.json"

const settings = settingsData as any

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Configure your AI calling agent and business settings" />

      <Tabs defaultValue="hours" className="space-y-6">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="hours"><Clock className="h-3.5 w-3.5 mr-1" />Business Hours</TabsTrigger>
          <TabsTrigger value="area"><MapPin className="h-3.5 w-3.5 mr-1" />Service Area</TabsTrigger>
          <TabsTrigger value="scripts"><MessageSquare className="h-3.5 w-3.5 mr-1" />AI Scripts</TabsTrigger>
          <TabsTrigger value="emergency"><AlertTriangle className="h-3.5 w-3.5 mr-1" />Emergency</TabsTrigger>
          <TabsTrigger value="routing"><Phone className="h-3.5 w-3.5 mr-1" />Call Routing</TabsTrigger>
          <TabsTrigger value="team"><Users className="h-3.5 w-3.5 mr-1" />Team</TabsTrigger>
        </TabsList>

        <TabsContent value="hours">
          <Card>
            <CardHeader><CardTitle className="text-base">Business Hours</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(settings.businessHours as any[]).map((day: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                    <div className="w-28">
                      <Label className="font-medium">{day.day}</Label>
                    </div>
                    <Switch defaultChecked={day.enabled} />
                    {day.enabled ? (
                      <div className="flex items-center gap-2">
                        <Input defaultValue={day.open} className="w-24 text-sm" />
                        <span className="text-muted-foreground">to</span>
                        <Input defaultValue={day.close} className="w-24 text-sm" />
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Closed</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="area">
          <Card>
            <CardHeader><CardTitle className="text-base">Service Area ZIP Codes</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Calls from outside these ZIP codes will be flagged as out-of-area.
              </p>
              <div className="flex flex-wrap gap-2">
                {(settings.serviceAreaZips as string[]).map((zip: string) => (
                  <Badge key={zip} variant="secondary" className="text-sm px-3 py-1">{zip}</Badge>
                ))}
              </div>
              <div className="mt-4">
                <Label className="text-sm">Add ZIP Code</Label>
                <div className="flex gap-2 mt-1">
                  <Input placeholder="19xxx" className="w-32" />
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted px-3">+ Add</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scripts">
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Greeting Script</CardTitle></CardHeader>
              <CardContent>
                <Textarea defaultValue={settings.greetingScript} rows={3} className="text-sm" />
                <div className="mt-3 p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Preview</p>
                  <p className="text-sm italic">&ldquo;{settings.greetingScript}&rdquo;</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">After-Hours Script</CardTitle></CardHeader>
              <CardContent>
                <Textarea defaultValue={settings.afterHoursScript} rows={5} className="text-sm" />
              </CardContent>
            </Card>

            {/* Gas/CO Safety Script */}
            <Card className="border-red-200 dark:border-red-900/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Flame className="h-4 w-4 text-red-500" />
                  Gas / CO Safety Script
                  <Badge variant="destructive" className="text-[10px] ml-2">Critical Safety</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea defaultValue={settings.gasCOSafetyScript} rows={5} className="text-sm border-red-200 dark:border-red-900/50" />
                <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50">
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-1">Safety Script Preview</p>
                  <p className="text-sm text-red-700 dark:text-red-300 italic">&ldquo;{settings.gasCOSafetyScript}&rdquo;</p>
                </div>
              </CardContent>
            </Card>

            {/* Electrical/Smoke Safety Script */}
            <Card className="border-orange-200 dark:border-orange-900/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  Electrical / Smoke Safety Script
                  <Badge className="text-[10px] ml-2 bg-orange-500 text-white">Safety</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea defaultValue={settings.electricalSafetyScript} rows={5} className="text-sm border-orange-200 dark:border-orange-900/50" />
                <div className="mt-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50">
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mb-1">Safety Script Preview</p>
                  <p className="text-sm text-orange-700 dark:text-orange-300 italic">&ldquo;{settings.electricalSafetyScript}&rdquo;</p>
                </div>
              </CardContent>
            </Card>

            {/* New Installation Intake Script */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  New Installation Intake Script
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea defaultValue={settings.newInstallScript} rows={5} className="text-sm" />
                <div className="mt-3 p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">Qualification Checklist</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Homeowner verification</li>
                    <li>Replacement vs. new installation</li>
                    <li>Current system details</li>
                    <li>Home square footage</li>
                    <li>Number of floors</li>
                    <li>Installation timeline</li>
                    <li>Financing interest</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Follow-up Survey Script */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4" />
                  Follow-up Survey Script
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea defaultValue={settings.followUpSurveyScript} rows={3} className="text-sm" />
                <div className="mt-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50">
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Survey Question Preview</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 italic">&ldquo;Did we get your issue scheduled quickly and correctly?&rdquo;</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emergency">
          <Card>
            <CardHeader><CardTitle className="text-base">Emergency Keywords</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                When these phrases are detected, the call is automatically flagged as emergency and routes to on-call technician.
              </p>
              <div className="flex flex-wrap gap-2">
                {(settings.emergencyKeywords as string[]).map((keyword: string) => (
                  <Badge key={keyword} variant="destructive" className="text-sm px-3 py-1">{keyword}</Badge>
                ))}
              </div>
              <div className="mt-4">
                <Label className="text-sm">Add Keyword</Label>
                <div className="flex gap-2 mt-1">
                  <Input placeholder="New keyword..." className="max-w-xs" />
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted px-3">+ Add</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routing">
          <Card>
            <CardHeader><CardTitle className="text-base">Call Routing Rules</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(settings.callRouting as any[]).map((rule: any) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">Priority {rule.priority}</Badge>
                        <p className="font-medium text-sm">{rule.name}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Condition: {rule.condition}</p>
                      <p className="text-xs text-muted-foreground">Destination: {rule.destination}</p>
                    </div>
                    <Switch defaultChecked={rule.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader><CardTitle className="text-base">Team Members</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(settings.team as any[]).map((member: any) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium text-sm">{member.name}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px] capitalize">{member.role}</Badge></TableCell>
                      <TableCell className="text-sm">{member.email}</TableCell>
                      <TableCell className="text-sm">{formatPhone(member.phone)}</TableCell>
                      <TableCell>
                        <Badge variant={member.status === "active" ? "default" : "secondary"} className="text-[10px]">{member.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
